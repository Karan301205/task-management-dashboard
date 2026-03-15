function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const navItems = [
    { icon: "▦", label: "Home" },
    { icon: "✉", label: "Messages" },
    { icon: "✓", label: "Tasks" },
    { icon: "♟", label: "Members" },
    { icon: "✦", label: "Settings" },
  ]

  const projects = [
    { color: "bg-purple-600", label: "Mobile App", active: true },
    { color: "bg-orange-400", label: "Website Redesign" },
    { color: "bg-purple-300", label: "Design System" },
    { color: "bg-blue-400", label: "Wireframes" },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-2">
        {collapsed ? (
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xs">P</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-gray-800 font-bold text-lg">Project M.</span>
          </div>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden md:block text-gray-400 hover:text-gray-600 text-sm ml-1 flex-shrink-0"
        >
          {collapsed ? ">>" : "<<"}
        </button>
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="md:hidden text-gray-400 hover:text-gray-600 text-lg ml-1"
        >
          x
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          
            key={item.label}
            href="#"
            onClick={onMobileClose}
            className={"flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm " + (collapsed ? "justify-center" : "")}
            title={item.label}
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* My Projects */}
      {!collapsed && (
        <div className="mt-6">
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              My Projects
            </span>
            <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">+</button>
          </div>
          <div className="flex flex-col gap-1">
            {projects.map((project) => {
              const projectClass = project.active
                ? "flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-purple-50 text-purple-700 font-medium"
                : "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"
              return (
                <a key={project.label} href="#" className={projectClass}>
                  <span className={"w-2 h-2 rounded-full flex-shrink-0 " + project.color}></span>
                  <span className="flex-1">{project.label}</span>
                  {project.active && <span className="text-gray-400 text-xs">...</span>}
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Collapsed Project Dots */}
      {collapsed && (
        <div className="mt-6 flex flex-col gap-3 items-center">
          {projects.map((project) => (
            <span
              key={project.label}
              className={"w-2.5 h-2.5 rounded-full " + project.color}
              title={project.label}
            ></span>
          ))}
        </div>
      )}

      {/* Thoughts Time */}
      {!collapsed && (
        <div className="mt-auto mx-2 bg-amber-50 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💡</div>
          <p className="text-sm font-semibold text-gray-700">Thoughts Time</p>
          <p className="text-xs text-gray-400 mt-1 mb-3">
            We don't have any notice for you, till then you can share your thoughts with your peers.
          </p>
          <button className="w-full text-xs border border-gray-300 rounded-lg py-2 text-gray-600 hover:bg-gray-100">
            Write a message
          </button>
        </div>
      )}

    </div>
  )

  return (
    <>
      {/* MOBILE OVERLAY BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={onMobileClose}
        ></div>
      )}

      {/* MOBILE SIDEBAR — slides in as overlay */}
      <div className={
        "fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 px-4 py-6 z-40 transition-transform duration-300 md:hidden " +
        (mobileOpen ? "translate-x-0" : "-translate-x-full")
      }>
        {sidebarContent}
      </div>

      {/* TABLET SIDEBAR — icon only */}
      <div className="hidden md:flex lg:hidden fixed top-0 left-0 h-screen w-16 px-2 bg-white border-r border-gray-200 flex-col py-6 z-30">
        <div className="flex flex-col h-full">
          <div className="flex justify-center mb-8">
            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              
                key={item.label}
                href="#"
                className="flex items-center justify-center px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm"
                title={item.label}
              >
                <span className="text-base">{item.icon}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 items-center">
            {projects.map((project) => (
              <span
                key={project.label}
                className={"w-2.5 h-2.5 rounded-full " + project.color}
                title={project.label}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP SIDEBAR — full or collapsed */}
      <div className={
        "hidden lg:flex fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex-col py-6 z-30 transition-all duration-300 " +
        (collapsed ? "w-16 px-2" : "w-64 px-4")
      }>
        {sidebarContent}
      </div>
    </>
  )
}

export default Sidebar