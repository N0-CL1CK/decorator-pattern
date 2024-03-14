import { Arquivo, Decorador, DecoradorCifrador, DecoradorCompressor } from "./decorators";

async function main() {
	const arquivo = new Decorador(
		new Arquivo()
	);

	const dadoParaCifrar = "O professor Leandro é muito fera!";
	const dadoParaComprimir = "nois ri, nois zoa, mas só deus sabe como ta a mente do palhaço";

	const cifrador = new DecoradorCifrador(arquivo);
	const compressor = new DecoradorCompressor(arquivo);

	await cifrador.escreverDados(dadoParaCifrar, "arquivo");
	await cifrador.lerDados("arquivo");

	await compressor.escreverDados(dadoParaComprimir, "arquivo2");
	await compressor.lerDados("arquivo2");
}

main();