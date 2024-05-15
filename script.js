const localStorageKey = 'market-list';  // Chave usada para armazenar os itens no localStorage
const localStorageBoughtKey = 'bought-list';  // Chave usada para armazenar os itens comprados/removidos

// Event listener para adicionar um novo item ao enviar o formulário
document.getElementById('item-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o comportamento padrão do formulário
    novoItem();  // Chama a função para adicionar um novo item
});

// Função para validar se o item já existe no localStorage
function validarSeExisteNovoItem(item) {
    const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");  // Obtém os itens do localStorage
    return values.some(x => x.name === item);  // Verifica se o item já existe na lista
}

// Função para adicionar um novo item
function novoItem() {
    const input = document.getElementById('input-novo-item');
    input.style.border = '';

    const inputValue = input.value.trim();  // Remove espaços em branco do início e fim do valor
    if (!inputValue) {
        input.style.border = '1px solid red';  // Adiciona borda vermelha se o valor estiver vazio
        alert('É necessário digitar o nome do item para adicionar ao carrinho');
        return;
    }
    if (validarSeExisteNovoItem(inputValue)) {
        alert('Esse item já está no carrinho');
        return;
    }

    const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");  // Obtém os itens do localStorage
    values.push({ name: inputValue });  // Adiciona o novo item à lista
    localStorage.setItem(localStorageKey, JSON.stringify(values));  // Salva a lista atualizada no localStorage
    showValues();  // Atualiza a lista exibida na tela
    input.value = '';  // Limpa o campo de input
}

// Função para mostrar os valores das listas
function showValues() {
    const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");  // Obtém os itens do localStorage
    const boughtValues = JSON.parse(localStorage.getItem(localStorageBoughtKey) || "[]");  // Obtém os itens comprados/removidos do localStorage

    // Exibe ou oculta a seção de itens no carrinho conforme a lista esteja vazia ou não
    const listSection = document.getElementById('shopping-list-section');
    if (values.length > 0) {
        listSection.style.display = 'block';
    } else {
        listSection.style.display = 'none';
    }

    // Exibe ou oculta a seção de itens comprados/removidos conforme a lista esteja vazia ou não
    const boughtListSection = document.getElementById('bought-list-section');
    if (boughtValues.length > 0) {
        boughtListSection.style.display = 'block';
    } else {
        boughtListSection.style.display = 'none';
    }

    const list = document.getElementById('market-list');
    list.innerHTML = values.map(item => 
        `<li>${item.name}<button id='btn-editar' title='Editar item' onclick='editItem("${item.name}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
      </svg></button><button id='btn-remover' title='Remover item' onclick='removeItem("${item.name}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
      </svg></button></li>`
    ).join('');

    const boughtList = document.getElementById('bought-list');
    boughtList.innerHTML = boughtValues.map(item =>
        `<li>${item.name}<button id='btn-remover' title='Remover permanentemente' onclick='removeBoughtItem("${item.name}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
      </svg></button></li>`
    ).join('');
}

// Função para remover um item da lista de itens no carrinho
function removeItem(itemName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values = values.filter(item => item.name !== itemName);  // Remove o item da lista
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    let boughtValues = JSON.parse(localStorage.getItem(localStorageBoughtKey) || "[]");
    boughtValues.push({ name: itemName });  // Adiciona o item à lista de comprados/removidos
    localStorage.setItem(localStorageBoughtKey, JSON.stringify(boughtValues));

    showValues();
}

// Função para remover permanentemente um item da lista de itens comprados/removidos
function removeBoughtItem(itemName) {
    let boughtValues = JSON.parse(localStorage.getItem(localStorageBoughtKey) || "[]");
    boughtValues = boughtValues.filter(item => item.name !== itemName);  // Remove o item da lista
    localStorage.setItem(localStorageBoughtKey, JSON.stringify(boughtValues));
    showValues();
}

// Função para editar um item da lista de itens no carrinho
function editItem(itemName) {
    const newName = prompt("Edite o nome do item:", itemName);
    if (newName && newName.trim() !== "") {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        const index = values.findIndex(item => item.name === itemName);
        if (index !== -1) {
            values[index].name = newName.trim();  // Atualiza o nome do item
            localStorage.setItem(localStorageKey, JSON.stringify(values));
            showValues();
        }
    }
}

// Inicializa a exibição das listas ao carregar a página
showValues();