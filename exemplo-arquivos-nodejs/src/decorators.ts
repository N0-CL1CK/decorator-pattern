import "dotenv/config";

import { createCipheriv, createDecipheriv } from "node:crypto";
import { createWriteStream, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createDeflate, inflate } from "node:zlib";

interface InterfaceBase {
	escreverDados(dado: string, nomeDoArquivo: string): Promise<void>;
	lerDados(nomeDoArquivo: string): Promise<void>;
}

export class Arquivo implements InterfaceBase {
	async escreverDados(dados: string, nomeDoArquivo: string): Promise<void> {}
	async lerDados(nomeDoArquivo: string): Promise<void> {}
}

export class Decorador implements InterfaceBase {
	protected wrappe: Arquivo;

	constructor(arquivo: Arquivo) {
		this.wrappe = arquivo;
	}

	async escreverDados(dados: string, nomeDoArquivo: string): Promise<void> {
		this.wrappe.escreverDados(dados, nomeDoArquivo);
	}

	async lerDados(nomeDoArquivo: string): Promise<void> {
		this.wrappe.lerDados(nomeDoArquivo);
	}
}

export class DecoradorCifrador extends Decorador {
	async escreverDados(dados: unknown, nomeDoArquivo: string): Promise<void> {
		try {
			const caminhoRelativo = `arquivos/${nomeDoArquivo}.leandro`;

			const cifra = createCipheriv(
				"aes-256-gcm",
				Buffer.from(process.env.AES_SECRET_KEY),
				Buffer.from(process.env.AES_SECRET_IV),
			);

			cifra.setAAD(Buffer.from(process.env.AES_SECRET_IV));

			const dadosEncriptados = Buffer.concat([
				cifra.update(JSON.stringify(dados), 'utf-8'),
				cifra.final(),
			]);

			const arquivoExiste = readdirSync("arquivos/").filter(arquivo => arquivo.match(nomeDoArquivo))[0]

			if (!arquivoExiste) {
				writeFileSync(`${caminhoRelativo}.${cifra.getAuthTag().toString('hex')}`, dadosEncriptados);

				console.log("[!] Dados encriptados e salvo com sucesso!");
			} else {
				console.log("O arquivo já existe, não é possível sobrescrever. Exclua ou insira outro caminho!");
			}
		} catch (error) {
			console.error(error);
			console.log("[x] A operação falhou e não foi possível concluí-la.");
		}
	}

	async lerDados(nomeDoArquivo: string): Promise<void> {
		try {
			const arquivo = readdirSync("arquivos/").filter(arquivo => arquivo.match(nomeDoArquivo))[0]
			
			if (arquivo) {
				const dadosEncriptados = readFileSync(`arquivos/${arquivo}`);
				const tag = arquivo.split(".").at(-1);

				const decifrador = createDecipheriv(
					"aes-256-gcm",
					Buffer.from(process.env.AES_SECRET_KEY),
					Buffer.from(process.env.AES_SECRET_IV),
				);

				decifrador.setAuthTag(Buffer.from(tag, "hex"));
				decifrador.setAAD(Buffer.from(process.env.AES_SECRET_IV));

				const dados = Buffer.concat([
					decifrador.update(dadosEncriptados),
					decifrador.final(),
				]).toString('utf-8');

				console.log(dados);
			} else {
				console.log("Caminho inexistente!");
			}
		} catch (error) {
			console.error(error);
			console.log("[x] A operação falhou e não foi possível concluí-la.");
		}
	}
}

export class DecoradorCompressor extends Decorador {
	async escreverDados(dados: any, nomeDoArquivo: string): Promise<void> {
		try {
			const caminhoRelativo = `arquivos/${nomeDoArquivo}.leandro`;

			const arquivoExiste = readdirSync("arquivos/").filter(arquivo => arquivo.match(nomeDoArquivo))[0]

			if (!arquivoExiste) {
				const deflate = createDeflate();
				const outputStream = createWriteStream(`${caminhoRelativo}.gz`);

				deflate.pipe(outputStream);
				deflate.write(JSON.stringify(dados), 'utf-8');
				deflate.end();

				await new Promise((resolve, reject) => {
					outputStream.on('finish', resolve);
					outputStream.on('error', reject);
				});

				console.log("[!] Dados comprimidos e salvo com sucesso!");
			} else {
				console.log("O arquivo já existe, não é possível sobrescrever. Exclua ou insira outro caminho!");
			}
		} catch (error) {
			console.error(error);
			console.log("[x] A operação falhou e não foi possível concluí-la.");
		}
	}

	async lerDados(nomeDoArquivo: string): Promise<void> {
		try {
			const arquivo = readdirSync("arquivos/").filter(arquivo => arquivo.match(nomeDoArquivo))[0]

			if (arquivo) {
				const buffer = readFileSync(`arquivos/${arquivo}`);

				inflate(buffer, (error, dados) => {
					(error)
						? console.error(error)
						: console.log(dados.toString('utf8'));
				});
			} else {
				console.log("Caminho inexistente!");
			}
		} catch (error) {
			console.error(error);
			console.log("[x] A operação falhou e não foi possível concluí-la.");
		}
	}
}