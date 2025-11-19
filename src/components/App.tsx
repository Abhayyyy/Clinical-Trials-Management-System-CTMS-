
export default function App() {
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
      case 'participants':
        return React.createElement(Participants, commonProps);
      case 'studies':
        return React.createElement(Studies, { data });
      case 'visits':
        return React.createElement(Visits, { data });
      case 'reports':
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
}