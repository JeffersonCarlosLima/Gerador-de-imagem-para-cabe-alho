function execCmd(command, value = null) {
    document.execCommand(command, false, value);
  }

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('canvas');
    const inputImagem1 = document.getElementById('input-imagem1');
    const inputImagem2 = document.getElementById('input-imagem2');
    const ctx = canvas.getContext('2d');
    const texto = document.getElementById('texto');
    let textarea = texto.textContent;
    console.log(textarea);
    const button = document.getElementById('botao');

    button.addEventListener('click', function () {
        const texto = textarea.value;

        // Importar imagem 1
        if (inputImagem1.files[0]) {
            const arquivo = inputImagem1.files[0];
            const leitor = new FileReader();

            leitor.onload = function () {
                const imagem = new Image();
                imagem.onload = function () {
                    const larguraMaxima = 200; // Tamanho máximo da imagem
                    const proporcao = imagem.width / imagem.height;
                    const larguraImagem = larguraMaxima;
                    const alturaImagem = larguraMaxima / proporcao;

                    // Importar imagem 2
                    if (inputImagem2.files[0]) {
                        const arquivo2 = inputImagem2.files[0];
                        const leitor2 = new FileReader();

                        leitor2.onload = function () {
                            const imagem1 = new Image();
                            imagem1.onload = function () {
                                const larguraImagem1 = larguraMaxima;
                                const alturaImagem1 = larguraMaxima / (imagem1.width / imagem1.height);

                                // Limpar o canvas
                                ctx.clearRect(0, 0, canvas.width, canvas.height);

                                // Desenhar o fundo (retângulo branco)
                                ctx.fillStyle = 'white';
                                ctx.fillRect(0, 0, canvas.width, canvas.height);

                                // Desenhar a primeira imagem no lado esquerdo do canvas
                                // Desenhar a primeira imagem à esquerda do canvas
                                ctx.drawImage(imagem, 0, 0, larguraImagem, alturaImagem);


                                // Desenhar o texto à direita da primeira imagem
                                ctx.font = '30px Arial';
                                ctx.fillStyle = 'black';
                                ctx.textAlign = 'left'; // Alinhamento à esquerda
                                ctx.fillText(texto, larguraImagem + 10, alturaImagem / 2);

                                // Desenhar a segunda imagem no lado direito do canvas
                                ctx.drawImage(imagem1, canvas.width - larguraImagem1, 0, larguraImagem1, alturaImagem1);

                                // Criar um link para baixar a imagem
                                const link = document.createElement('a');
                                link.download = 'imagem.jpg';
                                link.href = canvas.toDataURL('image/jpeg');
                                link.click();
                            };

                            imagem1.src = leitor2.result;
                        };

                        leitor2.readAsDataURL(arquivo2);
                    }
                };

                imagem.src = leitor.result;
            };

            leitor.readAsDataURL(arquivo);
        }
    });
});
