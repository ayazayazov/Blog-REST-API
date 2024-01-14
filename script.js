const posts = document.querySelector('#posts')
const postTitle = document.querySelector('#postTitle')
const postBody = document.querySelector('#postBody')

const editTitle = document.querySelector('#editTitle')
const editBody = document.querySelector('#editBody')
const editID = document.querySelector('#editID')

const deleteID = document.querySelector('#deleteID')

const shareBtn = document.querySelector('#shareBtn')
const editBtn = document.querySelector('#editBtn')
const deleteBtn = document.querySelector('#deleteBtn')


const shareOption = document.querySelector('#shareOption')
const editOption = document.querySelector('#editOption')
const deleteOption = document.querySelector('#deleteOption')

const shareForm = document.querySelector('.shareForm')
const editForm = document.querySelector('.editForm')
const deleteForm = document.querySelector('.deleteForm')

let data = [];

// https://loremflickr.com/640/480/${index}

shareOption.addEventListener('click', ()=>{
    shareForm.style.display = 'flex'
    editForm.style.display = 'none'
    deleteForm.style.display = 'none'
})

editOption.addEventListener('click', ()=>{
    editForm.style.display = 'flex'
    shareForm.style.display = 'none'
    deleteForm.style.display = 'none'
})

deleteOption.addEventListener('click', ()=>{
    deleteForm.style.display = 'flex'
    shareForm.style.display = 'none'
    editForm.style.display = 'none'
})
async function getPosts(){
    try {
        const response = await fetch('https://blog-api-t6u0.onrender.com/posts', {
            method: 'GET',
            headers:{
                'Content-Type': "application/json",
            }
        })
        const data = await response.json()
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

async function getPostID(id){
    try {
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': "application/json",
            }
        })
        const data = await response.json()
        console.log('data',data);
    } catch (err) {
        console.log('err',err);
    }
}

async function createPost(form){
    try {
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts`, {
            method: 'POST',
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

async function updatePost(id, form){
    try {
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

async function deletePost(id){
    try {
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': "application/json",
            },
        })
        const data = await response.json()
    } catch (err) {
        console.log('err',err);
    }
}

// getPosts()
// getPostID(100)
// createPost({title: "Jim McGill", body: "API TEST 2"})
// updatePost(100, {title: "John Doe", body: "Lorem IMPSUM"})
// deletePost(101)

function renderElements(data){
    posts.innerHTML = data.map((post, index) =>`
    <div class="post">
                <img src="https://loremflickr.com/640/480/${index}" alt="">
                <div class="postText">
                    <div class="title-body">
                        <h2>${post.title}</h2>
                        <h3>${post.body}</h3>
                    </div>
                    <div>
                        <h4>Post index: ${post.id}</h4>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

shareBtn.addEventListener('click', async function(){
    const title = postTitle.value;
    const body = postBody.value;
    const form = {
        title,
        body,
    };

    const newPost = await createPost(form);

    data = [newPost, ...data];

    renderElements(data);
})

editBtn.addEventListener('click', async function(){
    const title = editTitle.value;
    const body = editBody.value;
    form = {
        title,
        body
    }

    // const editPost =  await updatePost(editID.value, form)

    // let editPostID = -((editID.value)-data.length);

    // data[editPostID] = editPost;

    // renderElements(data);

    await updatePost(editID.value, form);

    data = await getPosts();

    renderElements(data.reverse());
})

deleteBtn.addEventListener('click', async function(){
    await deletePost(deleteID.value);
    // console.log('deleteID.value', deleteID.value);


    // let deletePostID = -((editID.value)-data.length);
    // console.log('deletePostID', deletePostID);


    // data.slice(deletePostID, deletePostID);

    // console.log('data', data);

    data = await getPosts();

    renderElements(data.reverse());
})


async function App() {
    data = await getPosts();
  
    renderElements(data.reverse());
  }
  
App();