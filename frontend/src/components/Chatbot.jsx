import React, { useState } from 'react';
import { BotMessageSquare, X, Send } from 'lucide-react';
import { chatService } from '../services/chatApi';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage = {
        text: inputMessage,
        sender: 'user'
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      const response = await chatService.sendMessage(inputMessage);
      
      if (response.success) {
        setMessages(prev => [...prev, {
          text: response.message,
          sender: 'assistant'
        }]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text, sender) => {
    if (sender === 'user') {
      return <div className="text-white">{text}</div>;
    }
    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            code: ({ children }) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-100 p-2 rounded text-sm font-mono overflow-x-auto">
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <BotMessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-red-700 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BotMessageSquare className="h-5 w-5" />
              <h3 className="font-semibold">Package Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                <p className='border-b border-black pb-2 font-bold'>👋 Hi! I'm your AI Package Assistant</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>You can ask questions like:</p>
                  <ul className="space-y-1 text-left list-disc pl-4">
                    <li>How does package tracking work?</li>
                    <li>What features does the website offer?</li>
                    <li>How do I manage package notifications?</li>
                  </ul>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-gray-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {renderMessage(msg.text, msg.sender)}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                  <div className="flex gap-2">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about our website..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-red-600/90 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 cursor-pointer"
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 