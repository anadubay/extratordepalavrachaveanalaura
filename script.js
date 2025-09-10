document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('botao-palavrachave');
    const entradaTexto = document.getElementById('entrada-de-texto');
    const resultadoDiv = document.getElementById('resultado-palavrachave');

    // Lista de stop words em português
    const stopWords = [
        "a", "o", "as", "os", "de", "do", "da", "dos", "das", "em", "um", "uma", "uns", "umas",
        "para", "com", "por", "que", "e", "é", "mas", "se", "ou", "não", "isso", "este", "esta",
        "assim", "também", "são", "ser", "foi", "estava", "estavam", "estamos", "estão", "mais",
        "você", "nós", "eles", "elas", "ele", "ela", "meu", "sua", "nosso", "seu", "muito", "seus", "suas", "pelo", "pela"
    ];

    botao.addEventListener('click', () => {
        const texto = entradaTexto.value;
        const palavrasChave = extrairPalavrasChave(texto);
        exibirResultado(palavrasChave);
    });

    function extrairPalavrasChave(texto) {
        if (!texto) {
            return [];
        }

        // Limpar e tokenizar o texto
        const palavras = texto.toLowerCase()
            .replace(/[.,;!?()"\n]/g, '') // Remove pontuação e quebras de linha
            .split(/\s+/) // Divide por espaços
            .filter(palavra => palavra.length > 2 && !stopWords.includes(palavra)); // Filtra palavras curtas e stop words

        const frequencias = {};
        palavras.forEach(palavra => {
            frequencias[palavra] = (frequencias[palavra] || 0) + 1;
        });

        // Ordenar as palavras por frequência
        const palavrasOrdenadas = Object.keys(frequencias).sort((a, b) => frequencias[b] - frequencias[a]);

        // Retornar as top 5 palavras-chave
        return palavrasOrdenadas.slice(0, 5);
    }

    function exibirResultado(palavrasChave) {
        resultadoDiv.innerHTML = ''; // Limpa resultados anteriores
        if (palavrasChave.length === 0) {
            resultadoDiv.innerHTML = '<p>Nenhuma palavra-chave encontrada.</p>';
            return;
        }

        const lista = document.createElement('ul');
        palavrasChave.forEach(palavra => {
            const item = document.createElement('li');
            item.textContent = palavra;
            lista.appendChild(item);
        });
        resultadoDiv.appendChild(lista);
    }
});
