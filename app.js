let listaDeNumerosAleatorio = [];
let numerosRestantes = Array.from({length: 10}, (_, i) => i + 1);
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
}

function exibirMensagem() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagem()

function verificarChute() {
    let chute = document.querySelector('input').value;
    chute = parseInt(chute);

    if (isNaN(chute) || chute < 1 || chute > 10) {
        exibirTextoNaTela('p', 'Por favor, escolha um número válido entre 1 e 10');
        return;
    }

    if (numeroSecreto === chute) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }

    listaDeNumerosAleatorio.push(chute);
    atualizarNumerosSorteados();
}

function gerarNumeroAleatorio() {
    let indice = parseInt(Math.random() * numerosRestantes.length);
    let numero = numerosRestantes.splice(indice, 1)[0];
    return numero;
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    listaDeNumerosAleatorio = [];
    numerosRestantes = Array.from({length: 10}, (_, i) => i + 1);
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagem();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    atualizarNumerosSorteados();
}

function atualizarNumerosSorteados() {
    let campo = document.getElementById('numeros-sorteados');
    campo.innerHTML = listaDeNumerosAleatorio.join(', ');
}
