import { useEffect, useState } from "react"

// useState is used here because we want to keep track of the state of the count and the like button for each card.
// useEffect is used here because we want to run some code when the component mounts and when the state of hasLiked changes.
const Card = ( {title} ) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked, title]);

  // When the component mounts, this code will run. 
  // useEffect(() => {
  //   console.log('card rendered');
  // }, []); 

  return (  
    // <div class="card" onClick={() => setCount((prevState) => prevState + 1)}>
    // connditional reundering count || null Can also use count ? count : null Count will only show if it's greater than 0
    <div class="card" onClick={() => setCount(count + 1)}>
  <h2>{title} <br /> {count || null}</h2> 
      
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : "🤍"}
      </button>
    </div>
  )
}

const App = () => {

  return (
  <div className="card-container">
    <Card title="Star Wars" />
    <Card title="Avatar" />
    <Card title="The Lion King" />
  </div>


  )
}

export default App
