window.onload=()=>{
    fetch("http://localhost:3000/getAllData").then(data => {
        return data.json();
    })
    .then(post => {
        console.log(post);

        var div = document.getElementById("allList")
        if(post.length > 0){
            var empty = document.querySelector(".emptyNote");
            empty.style.visibility = "hidden";
        }
        for(var i = 0; i<post.length; i++){
            console.log("The id is: ", post[i].id);
            div.innerHTML += `<div data-id=${post[i].id} class="oneProp">
                                <div class="space nameAndDelete">
                                    <span>
                                        ${post[i].Name} (${post[i].Size})
                                    </span>
                                    
                                    <button class="delete-btn">
                                        del
                                    </button>
                                </div>
                                <span class="space">
                                    ${post[i].Desc}
                                </span>

                        </div>`;
        }
        const deleteBtn = document.querySelectorAll(".delete-btn");
        // console.log(deleteBtn);
        deleteBtn.forEach(item=>{
            console.log(item);
            item.addEventListener("click", deleteItem); 
            function deleteItem(e){
                const element = e.currentTarget.parentElement.parentElement;
                const id = element.dataset.id;
                console.log("Inside the delete function", id);

                // fetch("http://localhost:3000/delete/").then(data => {
                //     return data.json();
                // })
                // .then(post =>{
                    
                // })
                fetch('http://localhost:3000/delete/'+id, {
                    method: 'delete'
                }).then(response =>{
                    // return data.json();
                    var listOfItems = document.getElementById("allList")
                    listOfItems.removeChild(element);
                })
            }
        });
    });
}
