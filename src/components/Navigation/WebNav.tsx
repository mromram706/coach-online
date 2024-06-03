import { useIntl } from "react-intl";
import NavListButton from "./NavList";

const WebNav: React.FC = () => {
  const intl = useIntl();

  return <NavListButton variant="h6" flexDirection="row" color="white" />;
};

export default WebNav;
