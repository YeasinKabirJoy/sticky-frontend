import AddButton from "./AddButton"
import LogoutButton from "./LogoutButton";
import BackButton from "./BackButton";

import Color from "./Color"
import colors from "../assets/colors.json";
const Controls = () => {
  return (
    <div id="controls">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
      <BackButton />
      <LogoutButton />
    </div>
  )
}

export default Controls
