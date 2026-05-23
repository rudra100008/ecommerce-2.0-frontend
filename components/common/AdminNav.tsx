import UserAvatar from "../ui/UserAvatar";

export default function AdminNav() {
  return (
    <nav className="bg-gray-800">
    
      <div className="h-20 flex items-center px-5 gap-4">
        {/* Search */}
        <div className="flex items-center justify-center">
          <input
            type="search"
            placeholder="Search anything..."
            className="input"
          />
        </div>

        {/* Notification + Admin Pic */}
        <div>
          <div className="cursor-pointer">
            <UserAvatar />
          </div>
        </div>
      </div>
    </nav>
  );
}
