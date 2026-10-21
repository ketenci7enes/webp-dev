import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  const items = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" },
  ] as const;

  return (
    <nav className="menu" aria-label="Ana menü">
      {items.map((item) => (
        <a
          key={item.name}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name);
          }}
          aria-current={current === item.name ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
export default Navigation;