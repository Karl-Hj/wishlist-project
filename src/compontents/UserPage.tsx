import { useParams } from "react-router-dom";
import { August } from "../pages/August";
import { Elin } from "../pages/Elin";
import { Jesper } from "../pages/Jesper";
import { Kalle } from "../pages/Kalle";
import { Liam } from "../pages/Liam";
import { Ewa } from "../pages/Ewa";
import { Niclas } from "../pages/Niclas";
import { Nina } from "../pages/Nina";
import { Lotten } from "../pages/Lotten";

//Renderas baserat på userName
const userComponents: Record<string, React.ElementType> = {
  august: August,
  elin: Elin,
  ewa: Ewa,
  jesper: Jesper,
  kalle: Kalle,
  liam: Liam,
  niclas: Niclas,
  nina: Nina,
  lotten: Lotten,
};
export function UserPage() {
  const { userName } = useParams<{ userName: string }>();

  // Om userName finns i userComponents, rendera motsvarande komponent
  const Component =
    userComponents[userName || ""] || (() => <div>User do not exists</div>);

  return <Component />;
}
