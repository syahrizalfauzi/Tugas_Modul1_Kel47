const numberInput = document.getElementById('numberInput');
const okButton = document.getElementById('okButton');
const statusText = document.getElementById('statusText');
const listContainer = document.getElementById('listContainer');

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

okButton.onclick = async () => {
    const jumlah = numberInput.value;
    statusText.innerText = jumlah > 0 ? 'Loading...' : 'Jumlah harus lebih dari 0';

    if(jumlah <= 0) return;

    //Fetch data dari API & convert ke JSON, hasilnya array
    const posts = await(await fetch(apiUrl)).json();

    console.log(posts);

    //Ambil data acak dari array sebanyak jumlah dari input
    let data = [];
    for (let i = 0; i < jumlah; i++) {
        const index = Math.round(Math.random() * 200);
        data.push(posts[index]);
    }

    //Pemrosesan data selesai, kosongkan statusText
    statusText.innerText = "";

    //Ubah tiap elemen dari data jadi string untuk di HTML
    const listItems = data.map((item) => 
    `<li>
        <h4>${item.title}</h4>
        <p>Milik user ID ${item.userId}</p>
    </li>`
    );
    //Gabungkan semua string HTML menjadi satu (bukan array)
    const listItemsHTML = listItems.reduce((previous, current) => `${previous}\n${current}`);

    listContainer.innerHTML= listItemsHTML;
};
