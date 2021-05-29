const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

inputTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.setAttribute('class', 'btn-apagar');
    btnApagar.innerText = 'Apagar';
    li.appendChild(btnApagar);
}

function criaBotaoRiscar(li) {
    li.innerText += ' ';
    const btnRiscar = document.createElement('button');
    btnRiscar.innerText = 'Riscar';
    btnRiscar.setAttribute('class', 'btn-riscar');
    li.appendChild(btnRiscar);
}

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    // criaBotaoApagar(li);
    criaBotaoRiscar(li);
    salvarTarefas();
}


btnTarefa.addEventListener('click', () => {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', (e) => {
    const elemento = e.target;

    // if (elemento.classList.contains('btn-apagar')) {
    //     elemento.parentElement.remove();
    //      salvarTarefas();
    // }

    if (elemento.classList.contains('btn-riscar')) {
        elemento.parentElement.setAttribute('class', 'riscado');
    }
});


function salvarTarefas() {
    const tarefaListada = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of tarefaListada) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Riscar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function pegaTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
        criarTarefa(tarefa);
    }
}

pegaTarefas();