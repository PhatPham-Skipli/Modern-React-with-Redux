import AccorditionPage from "../pages/Comp/AccordionPage";
import DropdownPage from "../pages/Comp/DropdownPage";
import ModalPage from "../pages/Comp/ModalPage";
import TablePage from "../pages/Comp/TablePage";

const CompRoutes = [
  {
    path: "accordion",
    element: <AccorditionPage />,
  },
  {
    path: "dropdown",
    element: <DropdownPage />,
  },
   {
    path: "dropdown",
    element: <DropdownPage />,
  },
  {
    path: "modal",
    element: <ModalPage />,
  },
   {
    path: "table",
    element: <TablePage />,
  }
];

export default CompRoutes;