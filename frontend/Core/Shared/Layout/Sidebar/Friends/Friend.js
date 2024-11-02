class Friend extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.access_token = localStorage.getItem('access_token');
        this.render()
    }

    render ()
    {
// Get the attributes after the element is attached to the DOM
const name = this.getAttribute("name") || "Unknown";
const img_url = this.getAttribute("img_url") || "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png";
const id = this.getAttribute("id") || "0";

const friend = document.createElement('div');
friend.className = "d-flex align-items-center justify-content-between mb-2";

friend.innerHTML = /*html*/ `
    <div class="d-flex align-items-center">
        <img src="${img_url}" class="rounded me-2" height='32'></img>
        <span class="fs-6 fw-medium text-dark-emphasis">
            ${name.length > 8 ? name.substring(0, 8) + "..." : name}
        </span>
    </div>
    <img id="invite" class='invite ${id}' src="./Core/Shared/assets/plus.svg" id width="24" height="24" class="cursor-pointer"></img>
`;
// 
const style = document.createElement('style');
style.textContent = `
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
    .cursor-pointer {
        cursor: pointer;
    }
    #invite {
        background: #062E00;
        border-radius: 4px;
    }
    #invite:hover {
        background: #000;
    }
`;

this.shadowRoot.append(style, friend);
this.shadowRoot.getElementById('invite').addEventListener('click', async () => {
    const data = await this.fetchMatchID();
    console.log(data);
    if (data) {
        this.shadowRoot.getElementById('invite').src = "";
        this.shadowRoot.getElementById('invite').classList.remove('cursor-pointer');
    }
})
    }
        
    
    async fetchMatchID() {
        const status = "invite";
        let response = await fetch(`http://localhost:8000/api/game/${status}/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${this.access_token}`,
            }
        });
        // response = await handleAuthResponse(response, this.fetchMatchID);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }

}

// Define the custom element
customElements.define('single-friend', Friend);
