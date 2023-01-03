const config = {
      headers: {
        "content-type": "application/json",
      },
  };
  const userSchema = require("./models/AccessModel.js");
  
  
  window.onload(
    fetchdata()
  )
  
  function fetchdata(){
      axios
        .post("/profile", JSON.stringify({}), config)
        .then((res) => {
          if (res.status !== 200) {
            alert("Failed to Read, Please try again!");
            return;
          }
          console.log(res.data);

        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!");
        });
  
  }
  