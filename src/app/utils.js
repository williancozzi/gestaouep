export const images = [
  "/loginBg/1.jpg",
  "/loginBg/2.jpg",
  "/loginBg/3.jpg",
  "/loginBg/4.jpg",
  "/loginBg/5.jpg",
  "/loginBg/6.jpg",
  "/loginBg/7.jpg",
  "/loginBg/8.jpg",
  "/loginBg/9.jpg",
  "/loginBg/10.jpg",
  "/loginBg/11.jpg",
  "/loginBg/12.jpg",
  "/loginBg/13.jpg",
  "/loginBg/14.jpg",
  "/loginBg/15.jpg",
];

export const phrases = [
  "''Fora da caridade não há salvação.''",
  "''Amai-vos uns aos outros e fazei o bem.''",
  "''Nascer, morrer, renascer ainda, progredir sempre, tal é a lei.''",
  "''O homem é um Espírito encarnado na Terra para progredir.''",
  "''.A lei de Deus é a lei do progresso.''",
  "''Deus é justiça, amor e sabedoria.''",
  "''A vida é uma prova e uma expiação.''",
  "''O futuro é a consequência do presente.''",
  "''A reencarnação é a volta do Espírito à Terra em um novo corpo.''",
  "''A prece é o encontro da alma com Deus.''",
  "''A caridade é a luz que ilumina o caminho da evolução.''",
  "''O perdão é a chave que abre a porta da felicidade.''",
  "''A fé remove montanhas.''",
  "''A esperança é a força que nos impulsiona para frente.''",
  "''A humildade é a base do verdadeiro conhecimento.''",
  "''A educação é a chave do progresso.''",
  "''O trabalho é a lei da vida.''",
  "''A família é a escola da alma.''",
  "''O amor é a força que move o universo.''",
  "''A mediunidade é a porta de entrada para o mundo espiritual.''",
  "''A morte não existe, é apenas uma mudança de plano.''",
  "''O Espiritismo é a religião do futuro.''",
  "''O Espiritismo é a ciência que nos revela a verdade.''",
  "''O Espiritismo é a consolação dos aflitos.''",
  "''O Espiritismo é a esperança dos que sofrem.''",
  "''O Espiritismo é a luz que guia a humanidade para o progresso.''",
  "''O Espiritismo é a chave da felicidade.''",
  "''O Espiritismo é a religião do amor.''",
  "''O Espiritismo é a religião da verdade.''",
  "''Aquele que dentre vós estiver sem pecado seja o primeiro que lhe atire pedra.''",
  "''A verdadeira liberdade está em saber perdoar.''",
  "''A bondade é a essência da alma.''",
  "''A verdadeira riqueza está no coração.''",
  "''A paz interior é o maior tesouro que podemos possuir.''",
  "''A maior conquista é vencer a si mesmo.''",
  "''O amor é a maior força do universo.''",
  "''A vida é uma jornada espiritual de aprendizado.''",
  "''A compaixão é o caminho para a evolução espiritual.''",
  "''A gratidão transforma o que temos em suficiente.''",
  "''A simplicidade é a verdadeira elegância da alma.''",
];

export function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export function getPhrase() {
  const randomPhrase = Math.floor(Math.random() * phrases.length);
  return phrases[randomPhrase];
}
