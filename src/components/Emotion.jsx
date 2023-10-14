const Emocion = ({ nombre }) => {
    const emociones = {
        happy: 'src/assets/emotion/emo01.png',
        no_trouble: 'src/assets/emotion/emo02.png',
        angry: 'src/assets/emotion/emo03.png',
        worried: 'src/assets/emotion/emo04.png',
        genial: 'src/assets/emotion/emo05.png',
        tired: 'src/assets/emotion/emo06.png',
        sad: 'src/assets/emotion/emo07.png',
        leisurely: 'src/assets/emotion/emo08.png',
        confused: 'src/assets/emotion/emo09.png',
        speechless: 'src/assets/emotion/emo10.png',
        pluff: 'src/assets/emotion/emo11.png',
    };
    return <Image source={emociones[nombre]} />;
};