// Clinical Trial Management Dashboard - React Application
const { useState, useEffect, useRef } = React;

// Mock data - in a real app this would come from an API
const mockData = {
  "participants": [
    {
      "id": "CT-2024-001",
      "name": "Sarah Johnson",
      "study": "Cardio-Protect Phase II",
      "status": "Enrolled",
      "enrollmentDate": "2024-01-15",
      "nextVisit": "2024-09-01",
      "phone": "(555) 123-4567",
      "age": 45,
      "gender": "Female"
    },
    {
      "id": "CT-2024-002", 
      "name": "Michael Chen",
      "study": "OncoTrial-2024-07",
      "status": "Screening",
      "enrollmentDate": "2024-02-10",
      "nextVisit": "2024-08-25",
      "phone": "(555) 234-5678",
      "age": 62,
      "gender": "Male"
    },
    {
      "id": "CT-2024-003",
      "name": "Emily Rodriguez",
      "study": "Diabetes Care Study",
      "status": "Enrolled", 
      "enrollmentDate": "2024-01-28",
      "nextVisit": "2024-08-30",
      "phone": "(555) 345-6789",
      "age": 58,
      "gender": "Female"
    },
    {
      "id": "CT-2024-004",
      "name": "David Thompson",
      "study": "Cardio-Protect Phase II",
      "status": "Completed",
      "enrollmentDate": "2023-12-05",
      "nextVisit": "N/A",
      "phone": "(555) 456-7890", 
      "age": 51,
      "gender": "Male"
    },
    {
      "id": "CT-2024-005",
      "name": "Lisa Wang",
      "study": "NeuroStim Trial",
      "status": "Enrolled",
      "enrollmentDate": "2024-03-12",
      "nextVisit": "2024-09-05",
      "phone": "(555) 567-8901",
      "age": 39,
      "gender": "Female"
    }
  ],
  "studies": [
    {
      "id": "STUDY-001",
      "name": "Cardio-Protect Phase II",
      "principalInvestigator": "Dr. Amanda Martinez",
      "targetEnrollment": 200,
      "currentEnrollment": 145,
      "status": "Recruiting",
      "startDate": "2023-09-01",
      "estimatedCompletion": "2024-12-31"
    },
    {
      "id": "STUDY-002", 
      "name": "OncoTrial-2024-07",
      "principalInvestigator": "Dr. Robert Kim",
      "targetEnrollment": 150,
      "currentEnrollment": 98,
      "status": "Recruiting",
      "startDate": "2024-01-15",
      "estimatedCompletion": "2025-06-30"
    },
    {
      "id": "STUDY-003",
      "name": "Diabetes Care Study", 
      "principalInvestigator": "Dr. Jennifer Brown",
      "targetEnrollment": 100,
      "currentEnrollment": 78,
      "status": "Recruiting",
      "startDate": "2023-11-01",
      "estimatedCompletion": "2024-10-31"
    },
    {
      "id": "STUDY-004",
      "name": "NeuroStim Trial",
      "principalInvestigator": "Dr. Mark Wilson", 
      "targetEnrollment": 80,
      "currentEnrollment": 34,
      "status": "Recruiting",
      "startDate": "2024-02-01",
      "estimatedCompletion": "2025-03-31"
    }
  ],
  "visits": [
    {
      "id": "VISIT-001",
      "participantId": "CT-2024-001",
      "participantName": "Sarah Johnson",
      "study": "Cardio-Protect Phase II",
      "visitType": "Week 4 Follow-up",
      "dateTime": "2024-09-01 10:00",
      "status": "Scheduled"
    },
    {
      "id": "VISIT-002",
      "participantId": "CT-2024-002", 
      "participantName": "Michael Chen",
      "study": "OncoTrial-2024-07",
      "visitType": "Screening Visit",
      "dateTime": "2024-08-25 14:30",
      "status": "Scheduled"
    },
    {
      "id": "VISIT-003",
      "participantId": "CT-2024-003",
      "participantName": "Emily Rodriguez", 
      "study": "Diabetes Care Study",
      "visitType": "Baseline Assessment",
      "dateTime": "2024-08-30 09:15",
      "status": "Scheduled"
    }
  ],
  "recentActivity": [
    {
      "id": 1,
      "type": "enrollment",
      "message": "New participant CT-2025-005 enrolled in NeuroStim Trial",
      "timestamp": "2025-08-20 15:30"
    },
    {
      "id": 2,
      "type": "screening",
      "message": "Screening completed for CT-2025-002 in OncoTrial-2024-07", 
      "timestamp": "2025-08-19 11:45"
    },
    {
      "id": 3,
      "type": "visit",
      "message": "Week 8 Follow-up completed for CT-2025-001",
      "timestamp": "2025-08-18 14:15"
    }
  ],
  "dashboardMetrics": {
    "totalParticipants": 152,
    "activeStudies": 8, 
    "pendingScreenings": 23,
    "monthlyEnrollment": 31
  },
  "enrollmentData": [
    {"month": "Jan", "enrollments": 18},
    {"month": "Feb", "enrollments": 22}, 
    {"month": "Mar", "enrollments": 28},
    {"month": "Apr", "enrollments": 25},
    {"month": "May", "enrollments": 31},
    {"month": "Jun", "enrollments": 29},
    {"month": "Jul", "enrollments": 34}
  ]
};

// Add Participant Modal Component
const AddParticipantModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    study: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParticipant = {
      id: `CT-2024-${String(Date.now()).slice(-3)}`,
      name: formData.name,
      phone: formData.phone,
      age: parseInt(formData.age),
      gender: formData.gender,
      study: formData.study,
      status: 'Screening',
      enrollmentDate: new Date().toISOString().split('T')[0],
      nextVisit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    onSubmit(newParticipant);
    setFormData({ name: '', phone: '', age: '', gender: '', study: '' });
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', age: '', gender: '', study: '' });
    onClose();
  };

  if (!isOpen) return null;

  return React.createElement('div', { className: 'modal' },
    React.createElement('div', { 
      className: 'modal-backdrop',
      onClick: handleClose
    }),
    React.createElement('div', { className: 'modal-content' },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', null, 'Add New Participant'),
        React.createElement('button', { 
          className: 'modal-close',
          onClick: handleClose
        }, '×')
      ),
      React.createElement('div', { className: 'modal-body' },
        React.createElement('form', { onSubmit: handleSubmit },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label', htmlFor: 'name' }, 'Full Name *'),
            React.createElement('input', {
              type: 'text',
              id: 'name',
              name: 'name',
              className: 'form-control',
              required: true,
              value: formData.name,
              onChange: handleInputChange
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label', htmlFor: 'phone' }, 'Phone Number *'),
            React.createElement('input', {
              type: 'tel',
              id: 'phone',
              name: 'phone',
              className: 'form-control',
              required: true,
              value: formData.phone,
              onChange: handleInputChange
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label', htmlFor: 'age' }, 'Age *'),
            React.createElement('input', {
              type: 'number',
              id: 'age',
              name: 'age',
              className: 'form-control',
              min: 18,
              max: 99,
              required: true,
              value: formData.age,
              onChange: handleInputChange
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label', htmlFor: 'gender' }, 'Gender *'),
            React.createElement('select', {
              id: 'gender',
              name: 'gender',
              className: 'form-control',
              required: true,
              value: formData.gender,
              onChange: handleInputChange
            },
              React.createElement('option', { value: '' }, 'Select Gender'),
              React.createElement('option', { value: 'Male' }, 'Male'),
              React.createElement('option', { value: 'Female' }, 'Female'),
              React.createElement('option', { value: 'Other' }, 'Other')
            )
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label', htmlFor: 'study' }, 'Study *'),
            React.createElement('select', {
              id: 'study',
              name: 'study',
              className: 'form-control',
              required: true,
              value: formData.study,
              onChange: handleInputChange
            },
              React.createElement('option', { value: '' }, 'Select Study'),
              React.createElement('option', { value: 'Cardio-Protect Phase II' }, 'Cardio-Protect Phase II'),
              React.createElement('option', { value: 'OncoTrial-2024-07' }, 'OncoTrial-2024-07'),
              React.createElement('option', { value: 'Diabetes Care Study' }, 'Diabetes Care Study'),
              React.createElement('option', { value: 'NeuroStim Trial' }, 'NeuroStim Trial')
            )
          ),
          React.createElement('div', { className: 'modal-actions' },
            React.createElement('button', {
              type: 'button',
              className: 'btn btn--outline',
              onClick: handleClose
            }, 'Cancel'),
            React.createElement('button', {
              type: 'submit',
              className: 'btn btn--primary'
            }, 'Add Participant')
          )
        )
      )
    )
  );
};

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'participants', label: 'Participants', icon: '👥' },
    { id: 'studies', label: 'Studies', icon: '📋' },
    { id: 'visits', label: 'Visits', icon: '📅' },
    { id: 'reports', label: 'Reports', icon: '📊' }
  ];

  return React.createElement('div', { className: 'sidebar' },
    React.createElement('div', { className: 'logo' },
      React.createElement('div', { className: 'logo-icon' }, 'CT'),
      React.createElement('div', { className: 'logo-text' }, 'ClinicalTrials')
    ),
    React.createElement('ul', { className: 'nav-menu' },
      navigation.map(item =>
        React.createElement('li', { key: item.id, className: 'nav-item' },
          React.createElement('a', {
            href: '#',
            className: `nav-link ${activeSection === item.id ? 'active' : ''}`,
            onClick: (e) => {
              e.preventDefault();
              setActiveSection(item.id);
            }
          },
            React.createElement('span', { className: 'nav-icon' }, item.icon),
            item.label
          )
        )
      )
    )
  );
};

// Dashboard Component
const Dashboard = ({ data, onAddParticipant }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.enrollmentData.map(d => d.month),
          datasets: [{
            label: 'Monthly Enrollments',
            data: data.enrollmentData.map(d => d.enrollments),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data.enrollmentData]);

  const metrics = [
    { label: 'Total Participants', value: data.dashboardMetrics.totalParticipants },
    { label: 'Active Studies', value: data.dashboardMetrics.activeStudies },
    { label: 'Pending Screenings', value: data.dashboardMetrics.pendingScreenings },
    { label: 'This Month Enrollment', value: data.dashboardMetrics.monthlyEnrollment }
  ];

  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, 'Dashboard'),
      React.createElement('p', { className: 'page-subtitle' }, 'Clinical Trial Management Overview')
    ),
    
    React.createElement('div', { className: 'metrics-grid' },
      metrics.map((metric, index) =>
        React.createElement('div', { key: index, className: 'metric-card' },
          React.createElement('div', { className: 'metric-value' }, metric.value),
          React.createElement('div', { className: 'metric-label' }, metric.label)
        )
      )
    ),

    React.createElement('div', { className: 'chart-container' },
      React.createElement('h3', { className: 'section-title' }, 'Enrollment Trend'),
      // React.createElement('canvas', { ref: chartRef })
    ),

    React.createElement('div', { className: 'activity-section' },
      React.createElement('h3', { className: 'section-title' }, 'Recent Activity'),
      data.recentActivity.map(activity =>
        React.createElement('div', { key: activity.id, className: 'activity-item' },
          React.createElement('div', { className: `activity-icon ${activity.type}` },
            activity.type === 'enrollment' ? 'E' : activity.type === 'screening' ? 'S' : 'V'
          ),
          React.createElement('div', { className: 'activity-content' },
            React.createElement('div', { className: 'activity-message' }, activity.message),
            React.createElement('div', { className: 'activity-time' }, activity.timestamp)
          )
        )
      )
    ),

    React.createElement('div', { className: 'quick-actions' },
      React.createElement('button', {
        className: 'btn btn--primary'
        // onClick: onAddParticipant
      }, 'Add New Participant'),
      React.createElement('button', { className: 'btn btn--outline' }, 'Schedule Visit')
    )
  );
};

// Participants Component
const Participants = ({ data, onAddParticipant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyFilter, setStudyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredParticipants = data.participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStudy = !studyFilter || participant.study === studyFilter;
    const matchesStatus = !statusFilter || participant.status === statusFilter;
    return matchesSearch && matchesStudy && matchesStatus;
  });

  const uniqueStudies = [...new Set(data.participants.map(p => p.study))];
  const uniqueStatuses = [...new Set(data.participants.map(p => p.status))];

  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, 'Participants'),
      React.createElement('p', { className: 'page-subtitle' }, 'Manage clinical trial participants')
    ),

    React.createElement('div', { className: 'action-buttons' },
      React.createElement('button', {
        className: 'btn btn--primary',
        onClick: onAddParticipants
      }, 'Add New Participant')
    ),

    React.createElement('div', { className: 'filters-section' },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Search participants...',
        className: 'form-control search-input',
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value)
      }),
      React.createElement('select', {
        className: 'form-control filter-select',
        value: studyFilter,
        onChange: (e) => setStudyFilter(e.target.value)
      },
        React.createElement('option', { value: '' }, 'All Studies'),
        uniqueStudies.map(study =>
          React.createElement('option', { key: study, value: study }, study)
        )
      ),
      React.createElement('select', {
        className: 'form-control filter-select',
        value: statusFilter,
        onChange: (e) => setStatusFilter(e.target.value)
      },
        React.createElement('option', { value: '' }, 'All Statuses'),
        uniqueStatuses.map(status =>
          React.createElement('option', { key: status, value: status }, status)
        )
      )
    ),

    React.createElement('div', { className: 'data-table' },
      React.createElement('table', { className: 'table' },
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'ID'),
            React.createElement('th', null, 'Name'),
            React.createElement('th', null, 'Study'),
            React.createElement('th', null, 'Status'),
            React.createElement('th', null, 'Enrollment Date'),
            React.createElement('th', null, 'Next Visit'),
            React.createElement('th', null, 'Actions')
          )
        ),
        React.createElement('tbody', null,
          filteredParticipants.map(participant =>
            React.createElement('tr', { key: participant.id },
              React.createElement('td', null, participant.id),
              React.createElement('td', null, participant.name),
              React.createElement('td', null, participant.study),
              React.createElement('td', null,
                React.createElement('span', {
                  className: `status-badge ${participant.status.toLowerCase()}`
                }, participant.status)
              ),
              React.createElement('td', null, new Date(participant.enrollmentDate).toLocaleDateString()),
              React.createElement('td', null, participant.nextVisit === 'N/A' ? 'N/A' : new Date(participant.nextVisit).toLocaleDateString()),
              React.createElement('td', null,
                React.createElement('button', { className: 'btn btn--sm btn--outline' }, 'View'),
                ' ',
                React.createElement('button', { className: 'btn btn--sm btn--secondary' }, 'Edit')
              )
            )
          )
        )
      )
    )
  );
};

// Studies Component
const Studies = ({ data }) => {
  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, 'Studies'),
      React.createElement('p', { className: 'page-subtitle' }, 'Active clinical trials and research studies')
    ),

    React.createElement('div', { className: 'studies-grid' },
      data.studies.map(study => {
        const progressPercent = (study.currentEnrollment / study.targetEnrollment) * 100;
        
        return React.createElement('div', { key: study.id, className: 'study-card' },
          React.createElement('div', { className: 'study-header' },
            React.createElement('h3', { className: 'study-name' }, study.name),
            React.createElement('p', { className: 'study-pi' }, study.principalInvestigator),
            React.createElement('span', {
              className: `status-badge ${study.status.toLowerCase()}`
            }, study.status)
          ),
          React.createElement('div', { className: 'enrollment-info' },
            React.createElement('div', { className: 'enrollment-numbers' },
              React.createElement('span', null, `${study.currentEnrollment} enrolled`),
              React.createElement('span', null, `${study.targetEnrollment} target`)
            ),
            React.createElement('div', { className: 'progress-bar' },
              React.createElement('div', {
                className: 'progress-fill',
                style: { width: `${progressPercent}%` }
              })
            )
          ),
          React.createElement('div', { className: 'study-dates' },
            React.createElement('p', null, `Started: ${new Date(study.startDate).toLocaleDateString()}`),
            React.createElement('p', null, `Est. Completion: ${new Date(study.estimatedCompletion).toLocaleDateString()}`)
          )
        );
      })
    )
  );
};

// Visits Component
const Visits = ({ data }) => {
  const [viewMode, setViewMode] = useState('list');

  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, 'Visits'),
      React.createElement('p', { className: 'page-subtitle' }, 'Upcoming and completed participant visits')
    ),

    React.createElement('div', { className: 'view-toggle' },
      React.createElement('button', {
        className: `toggle-btn ${viewMode === 'list' ? 'active' : ''}`,
        onClick: () => setViewMode('list')
      }, 'List View'),
      React.createElement('button', {
        className: `toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`,
        onClick: () => setViewMode('calendar')
      }, 'Calendar View')
    ),

    React.createElement('div', { className: 'data-table' },
      React.createElement('table', { className: 'table' },
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Participant'),
            React.createElement('th', null, 'Study'),
            React.createElement('th', null, 'Visit Type'),
            React.createElement('th', null, 'Date & Time'),
            React.createElement('th', null, 'Status'),
            React.createElement('th', null, 'Actions')
          )
        ),
        React.createElement('tbody', null,
          data.visits.map(visit =>
            React.createElement('tr', { key: visit.id },
              React.createElement('td', null, visit.participantName),
              React.createElement('td', null, visit.study),
              React.createElement('td', null, visit.visitType),
              React.createElement('td', null, new Date(visit.dateTime).toLocaleString()),
              React.createElement('td', null,
                React.createElement('span', {
                  className: `status-badge ${visit.status.toLowerCase()}`
                }, visit.status)
              ),
              React.createElement('td', null,
                React.createElement('button', { className: 'btn btn--sm btn--outline' }, 'Complete'),
                ' ',
                React.createElement('button', { className: 'btn btn--sm btn--secondary' }, 'Reschedule')
              )
            )
          )
        )
      )
    )
  );
};

// Reports Component
const Reports = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.studies.map(s => s.name),
          datasets: [{
            label: 'Current Enrollment',
            data: data.studies.map(s => s.currentEnrollment),
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data.studies]);

  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, 'Reports'),
      React.createElement('p', { className: 'page-subtitle' }, 'Analytics and study performance reports')
    ),

    React.createElement('div', { className: 'action-buttons' },
      React.createElement('button', { className: 'btn btn--outline' }, 'Export PDF'),
      React.createElement('button', { className: 'btn btn--outline' }, 'Export Excel')
    ),

    React.createElement('div', { className: 'chart-container' },
      React.createElement('h3', { className: 'section-title' }, 'Enrollment by Study'),
      React.createElement('canvas', { ref: chartRef })
    ),

    React.createElement('div', { className: 'metrics-grid' },
      React.createElement('div', { className: 'metric-card' },
        React.createElement('div', { className: 'metric-value' }, '89%'),
        React.createElement('div', { className: 'metric-label' }, 'Overall Enrollment Rate')
      ),
      React.createElement('div', { className: 'metric-card' },
        React.createElement('div', { className: 'metric-value' }, '2.3'),
        React.createElement('div', { className: 'metric-label' }, 'Avg. Visits per Month')
      ),
      React.createElement('div', { className: 'metric-card' },
        React.createElement('div', { className: 'metric-value' }, '94%'),
        React.createElement('div', { className: 'metric-label' }, 'Visit Compliance Rate')
      )
    )
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddParticipant = (newParticipant) => {
    setData(prevData => ({
      ...prevData,
      participants: [...prevData.participants, newParticipant]
    }));
    alert('Participant added successfully!');
  };

  const renderContent = () => {
    const commonProps = {
      data,
      onAddParticipant: () => setShowAddModal(true)
    };

    switch (activeSection) {
      case 'dashboard':
        return React.createElement(Dashboard, commonProps);
      case 'participantss':
        return React.createElement(Participants, commonProps);
      case 'studiess':
        return React.createElement(Studies, { data });
      case 'visitss':
        return React.createElement(Visits, { data });
      case 'reportss':
        return React.createElement(Reports, { data });
      default:
        return React.createElement(Dashboard, commonProps);
    }
  };

  if (loading) {
    return React.createElement('div', { className: 'loading-spinner' },
      React.createElement('div', { className: 'spinner' })
    );
  }

  return React.createElement('div', { className: 'app-container' },
    React.createElement(Sidebar, { activeSection, setActiveSection }),
    React.createElement('main', { className: 'main-content' },
      renderContent()
    ),
    React.createElement(AddParticipantModal, {
      isOpen: showAddModal,
      onClose: () => setShowAddModal(false),
      onSubmit: handleAddParticipant
    })
  );
};

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));