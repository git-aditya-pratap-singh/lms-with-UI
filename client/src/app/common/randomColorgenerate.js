const getRandomHexColor = () => {
    //const colors = [ '#FFB533', '#4d4dff', '#1f3f60', '#19334d','#ff1a75', '#4dff88', '#d633ff', '#ff0000'];
    const colors = [ '#ff3333', '#3366ff', '#4dff88', '#002233', '#cccc00', '#ff0066', '#ff4dff', '#4dd2ff', '#ff8c1a' ]
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
export default getRandomHexColor;
  
  