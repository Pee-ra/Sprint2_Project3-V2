export default function DesktopNavigation({ navigation, currentView, handleNavClick, isAdmin }) {
  return (
    <div className="hidden md:flex items-center space-x-1">
      {navigation.map((item) => (
        <button
          key={item.name}
          onClick={() => handleNavClick(item.view)}
          className={`flex items-center px-4 py-2 rounded-lg text-sm transition-all group ${
            currentView === item.view
              ? isAdmin
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                : 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <item.icon className={`h-4 w-4 mr-2 transition-transform group-hover:scale-110 ${
            currentView === item.view ? 'text-current' : ''
          }`} />
          <span className="font-medium">{item.name}</span>
        </button>
      ))}
    </div>
  );
}