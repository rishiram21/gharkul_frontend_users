import React, { useState } from 'react';
import { Shield, RefreshCw, Users, Building, Eye, Lock, CreditCard, Calendar, Mail, Phone, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const privacySections = [
    {
      id: 'data-collection',
      title: 'Information We Collect',
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Personal Information</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li>Name, email address, phone number, and contact details</li>
            <li>Professional credentials and licensing information (for brokers)</li>
            <li>Property ownership documentation and verification</li>
            <li>Payment and billing information</li>
            <li>Profile photos and business logos</li>
          </ul>
          
          <h4 className="font-semibold text-gray-800 mt-6">Property Information</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li>Property addresses, descriptions, and specifications</li>
            <li>Photos, virtual tours, and multimedia content</li>
            <li>Pricing, availability, and rental terms</li>
            <li>Property history and transaction records</li>
          </ul>

          <h4 className="font-semibold text-gray-800 mt-6">Usage Data</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li>Search queries and browsing patterns</li>
            <li>Device information and IP addresses</li>
            <li>Location data (with permission)</li>
            <li>Communication logs and interaction history</li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">For Property Owners</h4>
            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
              <li>Creating and managing property listings</li>
              <li>Connecting with qualified brokers and tenants</li>
              <li>Processing rental applications and agreements</li>
              <li>Facilitating secure payment transactions</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">For Brokers</h4>
            <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
              <li>Verifying professional credentials and licenses</li>
              <li>Matching with relevant property listings</li>
              <li>Managing client relationships and transactions</li>
              <li>Commission tracking and payment processing</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Platform Operations</h4>
            <ul className="list-disc list-inside space-y-1 text-purple-800 text-sm">
              <li>Improving search algorithms and user experience</li>
              <li>Preventing fraud and ensuring platform security</li>
              <li>Providing customer support and assistance</li>
              <li>Sending important updates and notifications</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing & Disclosure',
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800 font-medium">We never sell your personal information to third parties.</p>
          </div>

          <h4 className="font-semibold text-gray-800">We may share information in these circumstances:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
            <li><strong>Service Providers:</strong> Trusted partners who help operate our platform</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale</li>
            <li><strong>Property Inquiries:</strong> Contact details shared between interested parties</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h5 className="font-semibold text-gray-800 mb-2">Third-Party Services We Use:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• Payment Processing (Stripe, PayPal)</div>
              <div>• Email Services (SendGrid)</div>
              <div>• Analytics (Google Analytics)</div>
              <div>• Cloud Storage (AWS, Google Cloud)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: 'Data Security & Protection',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">We implement industry-standard security measures to protect your information:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Technical Safeguards</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• SSL/TLS encryption for data transmission</li>
                <li>• AES-256 encryption for stored data</li>
                <li>• Regular security audits and penetration testing</li>
                <li>• Secure database architecture</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-900 mb-2">Access Controls</h5>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Multi-factor authentication (MFA)</li>
                <li>• Role-based access permissions</li>
                <li>• Regular access reviews and updates</li>
                <li>• Secure password requirements</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h5 className="font-semibold text-red-900 mb-2">⚠️ Data Breach Protocol</h5>
            <p className="text-red-800 text-sm">In the unlikely event of a data breach, we will notify affected users within 72 hours and take immediate steps to secure the platform and investigate the incident.</p>
          </div>
        </div>
      )
    },
    {
      id: 'user-rights',
      title: 'Your Rights & Choices',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">You have the following rights regarding your personal information:</p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-semibold text-gray-800">Access & Portability</h5>
                <p className="text-sm text-gray-600">Request a copy of your personal data in a portable format</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-semibold text-gray-800">Correction & Updates</h5>
                <p className="text-sm text-gray-600">Update or correct inaccurate personal information</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-semibold text-gray-800">Deletion</h5>
                <p className="text-sm text-gray-600">Request deletion of your account and associated data</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-semibold text-gray-800">Opt-out</h5>
                <p className="text-sm text-gray-600">Unsubscribe from marketing communications at any time</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">How to Exercise Your Rights</h5>
            <p className="text-blue-800 text-sm">Contact our Privacy Team at <strong>privacy@propertyhub.com</strong> or use the account settings page to manage your preferences.</p>
          </div>
        </div>
      )
    }
  ];

  const refundSections = [
    {
      id: 'subscription-refunds',
      title: 'Subscription & Service Fees',
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Property Owner Plans</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Basic Plan: ₹999/month</li>
                <li>• Premium Plan: ₹1,999/month</li>
                <li>• Enterprise Plan: ₹4,999/month</li>
                <li>• 7-day free trial for new users</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-900 mb-2">Broker Plans</h5>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Individual: ₹1,499/month</li>
                <li>• Team Plan: ₹3,999/month</li>
                <li>• Agency Plan: ₹9,999/month</li>
                <li>• Commission-based options available</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h5 className="font-semibold text-yellow-900 mb-2">Refund Policy</h5>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Full refund within 14 days of initial subscription</li>
              <li>• Pro-rated refunds for annual plans cancelled within 30 days</li>
              <li>• No refunds for partial months or commission fees</li>
              <li>• Refunds processed within 5-7 business days</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'transaction-fees',
      title: 'Transaction & Commission Fees',
      icon: <Building className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-3">Fee Structure</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Platform Transaction Fee</span>
                <span className="font-semibold">2.5% + ₹50</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Broker Commission (Standard)</span>
                <span className="font-semibold">1-3% of property value</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Payment Processing</span>
                <span className="font-semibold">2.9% + ₹30</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Listing Enhancement</span>
                <span className="font-semibold">₹500 - ₹2,000</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h5 className="font-semibold text-red-900 mb-2">Non-Refundable Fees</h5>
            <ul className="text-red-800 text-sm space-y-1">
              <li>• Transaction fees for completed deals</li>
              <li>• Commission payments already disbursed</li>
              <li>• Third-party service charges (verification, legal)</li>
              <li>• Premium listing enhancement fees</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-900 mb-2">Refundable Scenarios</h5>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Platform technical errors causing failed transactions</li>
              <li>• Duplicate charges or billing mistakes</li>
              <li>• Service unavailability for extended periods</li>
              <li>• Fraudulent transactions (after investigation)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'refund-process',
      title: 'Refund Request Process',
      icon: <RefreshCw className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-3">How to Request a Refund</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-blue-800 text-sm">Log into your account and navigate to Billing & Payments</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-blue-800 text-sm">Select the transaction you want to dispute or refund</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-blue-800 text-sm">Fill out the refund request form with detailed reason</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <p className="text-blue-800 text-sm">Submit supporting documentation if required</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Processing Timeline</h5>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Review: 2-3 business days</li>
                <li>• Approval: 1-2 business days</li>
                <li>• Processing: 5-7 business days</li>
                <li>• Bank transfer: 3-5 additional days</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Required Information</h5>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Transaction ID or receipt number</li>
                <li>• Detailed reason for refund request</li>
                <li>• Supporting documentation</li>
                <li>• Account verification details</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h5 className="font-semibold text-yellow-900 mb-2">Alternative Contact Methods</h5>
            <div className="space-y-2 text-yellow-800 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email: refunds@propertyhub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone: +91 96327 48927</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Live Chat: Available 9 AM - 6 PM IST, Monday-Friday</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">If you're not satisfied with our refund decision, we offer multiple resolution paths:</p>

          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Internal Appeal Process</h5>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Request escalation to senior management within 30 days</li>
                <li>• Provide additional evidence or documentation</li>
                <li>• Receive final internal decision within 7 business days</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-900 mb-2">Third-Party Mediation</h5>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Independent mediation through National Consumer Helpline</li>
                <li>• Online dispute resolution platforms</li>
                <li>• Industry arbitration services</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-semibold text-purple-900 mb-2">Legal Recourse</h5>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Consumer protection forums</li>
                <li>• Civil courts for contractual disputes</li>
                <li>• Small claims tribunals for minor amounts</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">Governing Law</h5>
            <p className="text-gray-600 text-sm">These policies are governed by Indian law, specifically the Consumer Protection Act, 2019, and disputes will be subject to the jurisdiction of courts in Mumbai, Maharashtra.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy & Refund Policy</h1>
              <p className="text-gray-600 mt-2">Comprehensive policies for property owners and brokers</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Last updated: June 26, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'privacy' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Privacy Policy</span>
                </button>
                <button
                  onClick={() => setActiveTab('refund')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'refund' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="font-medium">Refund Policy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {activeTab === 'privacy' && (
                <div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">Privacy Policy</h2>
                        <p className="text-blue-100 mt-1">How we collect, use, and protect your information</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-600 text-lg mb-6">
                        At PropertyHub, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we handle data for both property owners and brokers using our platform.
                      </p>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <p className="text-blue-800">
                          <strong>Quick Summary:</strong> We collect information necessary to provide our property listing services, protect it with industry-standard security measures, and never sell your personal data to third parties.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {privacySections.map((section) => (
                        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-blue-600">{section.icon}</div>
                              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                            </div>
                            {expandedSections[section.id] ? 
                              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            }
                          </button>
                          {expandedSections[section.id] && (
                            <div className="p-6 border-t border-gray-200">
                              {section.content}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'refund' && (
                <div>
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                    <div className="flex items-center space-x-3">
                      <RefreshCw className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl font-bold">Refund Policy</h2>
                        <p className="text-green-100 mt-1">Clear guidelines for refunds and dispute resolution</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-600 text-lg mb-6">
                        We strive to provide excellent service to all our users. If you're not satisfied with our services, this policy outlines when and how refunds are processed for both property owners and real estate brokers.
                      </p>

                      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                        <p className="text-green-800">
                          <strong>Money-Back Guarantee:</strong> New subscribers can request a full refund within 14 days of their first subscription, no questions asked.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {refundSections.map((section) => (
                        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-green-600">{section.icon}</div>
                              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                            </div>
                            {expandedSections[section.id] ? 
                              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            }
                          </button>
                          {expandedSections[section.id] && (
                            <div className="p-6 border-t border-gray-200">
                              {section.content}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2" />
                  Need Help or Have Questions?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2">Email Support</h4>
                    <p className="text-gray-300 text-sm mb-2">Get detailed help via email</p>
                    <div className="space-y-1 text-sm">
                      <p>General: gharkul@gmail.com</p>
                      <p>Privacy: support@gharkul.com</p>
                      <p>Refunds: refunds@gharkul.com</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2">Phone Support</h4>
                    <p className="text-gray-300 text-sm mb-2">Speak with our team directly</p>
                    <div className="space-y-1 text-sm">
                      <p>+91 96327 48927</p>
                      <p className="text-gray-400">Mon-Fri: 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Building className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2">Office Address</h4>
                    <p className="text-gray-300 text-sm mb-2">Visit us in person</p>
                    <div className="space-y-1 text-sm">
                      <p>Wakad Road</p>
                      <p>Hinjewadi</p>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-300">
                      <p>Response Time: Email (24-48 hours) | Phone (Immediate) | Live Chat (5 minutes)</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Live Chat
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Legal Notice */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Important Legal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Regulatory Compliance</h4>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• RERA Registration: NA</li>
                    <li>• GST Number: NA</li>
                    <li>• ISO 27001:2013 Certified</li>
                    <li>• Consumer Protection Act, 2019 Compliant</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Data Protection</h4>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• GDPR Compliant for EU users</li>
                    <li>• Digital Personal Data Protection Act, 2023</li>
                    <li>• Industry-standard encryption (AES-256)</li>
                    <li>• Regular third-party security audits</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  <strong>Disclaimer:</strong> This platform facilitates connections between property owners and brokers. We are not directly involved in property transactions and recommend consulting legal professionals for complex matters. All property dealings are subject to applicable local and state laws.
                </p>
              </div>
            </div>

            {/* Version History */}
            {/* <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Policy Updates & Version History
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Version 3.2 - Current</h4>
                        <p className="text-gray-600 text-sm mt-1">Enhanced data protection measures and clearer refund terms for brokers</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">June 26, 2025</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Version 3.1</h4>
                        <p className="text-gray-600 text-sm mt-1">Updated commission structure and added dispute resolution process</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">March 15, 2025</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Version 3.0</h4>
                        <p className="text-gray-600 text-sm mt-1">Major update: GDPR compliance and new privacy controls for users</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">January 1, 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Policy Updates:</strong> We will notify all users via email at least 30 days before any significant policy changes take effect. Continued use of our services after changes indicates acceptance of the updated terms.
                </p>
              </div>
            </div> */}

            {/* Footer Actions */}
            {/* <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 p-6 bg-white rounded-xl shadow-lg">
              <div className="text-sm text-gray-600">
                <p>Still have questions about our policies?</p>
                <p className="font-medium">We're here to help clarify any concerns.</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Contact Support
                </button>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                  Download PDF
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;