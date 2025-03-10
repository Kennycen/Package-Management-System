import packageModel from "../models/packageModel.js";

// Get all packages for a user
const getPackages = async (req, res) => {
  try {
    const packages = await packageModel.find({ userId: req.user.id });
    res.json({ success: true, packages });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Add a new package
const addPackage = async (req, res) => {
  try {
    const {
      trackingNumber,
      recipient,
      apartment,
      description,
      carrier,
      size,
    } = req.body;

    if (!trackingNumber || !recipient || !apartment || !carrier || !size) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const packageData = {
      trackingNumber,
      recipient,
      apartment,
      description,
      carrier,
      size,
      arrivalDate: new Date(),
      status: "arrived",
      userId: req.user.id,
    };

    const newPackage = new packageModel(packageData);
    await newPackage.save();

    res.json({ success: true, package: newPackage });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update package status
const updatePackageStatus = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { status } = req.body;

    if (!["arrived", "notified", "picked"].includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const pkg = await packageModel.findOne({ 
      _id: packageId,
      userId: req.user.id 
    });

    if (!pkg) {
      return res.json({ success: false, message: "Package not found" });
    }

    // Update status and corresponding dates
    pkg.status = status;
    if (status === "notified") {
      pkg.notificationDate = new Date();
    } else if (status === "picked") {
      pkg.pickupDate = new Date();
    }

    await pkg.save();

    res.json({ success: true, package: pkg });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get packages by status
const getPackagesByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!["arrived", "notified", "picked"].includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const packages = await packageModel.find({
      userId: req.user.id,
      status: status
    });

    res.json({ success: true, packages });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { getPackages, addPackage, updatePackageStatus, getPackagesByStatus };
