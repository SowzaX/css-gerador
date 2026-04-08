const botao = document.querySelector(".botao-gerar")
const caixaTexto = document.querySelector(".caixa-texto")
const blocoCodigo = document.querySelector(".bloco-codigo")
const resultadoCodigo = document.querySelector(".resultado-codigo")

const endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {
    const textoUsuario = caixaTexto.value.trim()

    if (!textoUsuario) {
        blocoCodigo.textContent = "Digite algo antes de gerar o código."
        return
    }

    blocoCodigo.textContent = "Gerando..."

    try {
        const resposta = await fetch(endereco, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer SUA_API_KEY_AQUI"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador de código HTML e CSS. Responda apenas com código puro, sem markdown ou explicações. Envie primeiro a tag <style> com o CSS e depois o HTML."
                    },
                    {
                        role: "user",
                        content: textoUsuario
                    }
                ]
            })
        })

        const dados = await resposta.json()
        const resultado = dados.choices?.[0]?.message?.content || "Nenhum código foi gerado."

        blocoCodigo.textContent = resultado
        resultadoCodigo.srcdoc = resultado
    } catch (erro) {
        blocoCodigo.textContent = "Erro ao gerar o código."
        console.error(erro)
    }
}

botao.addEventListener("click", gerarCodigo)
