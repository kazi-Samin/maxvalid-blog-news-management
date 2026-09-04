import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="public-layout">
      {/* TODO: Add Header */}
      <main>
        <Outlet />
      </main>
      {/* TODO: Add Footer and Mobile Bottom Nav */}
    </div>
  );
}

export default PublicLayout;
