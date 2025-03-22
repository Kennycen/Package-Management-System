import packageModel from "../models/packageModel.js";
import emailService from "../services/emailService.js";

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
      email,
      apartment,
      description,
      carrier,
      size,
    } = req.body;

    if (!trackingNumber || !recipient || !email || !apartment || !carrier || !size) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const packageData = {
      trackingNumber,
      recipient,
      email,
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

    // If status is changing to 'notified', send email notification
    if (status === 'notified' && pkg.status === 'arrived') {
      try {
        await emailService.sendPackageNotification(pkg.email, pkg);
        pkg.notificationDate = new Date();
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to send email notification' 
        });
      }
    }

    // If status is changing to 'picked', update pickup date
    if (status === 'picked') {
      pkg.pickupDate = new Date();
    }

    pkg.status = status;
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
    }).sort({ arrivalDate: -1 });

    res.json({ success: true, packages });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    const pkg = await packageModel.findOne({ 
      _id: packageId,
      userId: req.user.id 
    });

    if (!pkg) {
      return res.json({ success: false, message: "Package not found" });
    }

    // Only allow deletion of picked up packages
    if (pkg.status !== 'picked') {
      return res.json({ 
        success: false, 
        message: "Only picked up packages can be deleted" 
      });
    }

    await packageModel.deleteOne({ _id: packageId });

    res.json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { getPackages, addPackage, updatePackageStatus, getPackagesByStatus, deletePackage };
