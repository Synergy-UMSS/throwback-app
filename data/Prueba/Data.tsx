const songs = [
    {
        id: 1,
        title: '13 Beaches',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Lust_for_Life.png'),
        url:require('../../assets-prueba/songs/lana-del-rey-13-beaches.mp3'),
    },
    {
        id: 2,
        title: 'Thunder',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Blue_Banisters.png'),
        url:require('../../assets-prueba/songs/lana-del-rey-thunder.mp3'),
    },
    {
        id: 3,
        title: 'Meet Me In The PaleMoonlight',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/unreleased_Lana_del_Rey.jpg'),
        url:require('../../assets-prueba/songs/Meet_Me_in_the_Pale_Moonlight.mp3'),
    },
    {
        id: 4,
        title: 'Text Book',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Blue_Banisters.png'),
        url:require('../../assets-prueba/songs/lana-del-rey-text-book.mp3'),
    },

    
    {
        id: 5,
        title: 'Easy On Me',
        artist: 'Adele',
        artwork: require('../../assets-prueba/images/Adele_Easy_on_Me.jpg'),
        url:require('../../assets-prueba/songs/Adele_Easy_On_Me.mp3'),
    },
    {
        id: 6,
        title: 'Deja que te bese',
        artist: 'Alejandro Sanz',
        artwork: require('../../assets-prueba/images/deja_que_te_bese.jpg'),
        url:require('../../assets-prueba/songs/Alejandro_Sanz_Deja_Que_TeBese_ft_Marc_Anthony.mp3'),
    },
    {
        id: 7,
        title: 'Love Generation',
        artist: 'Bob Sinclar',
        artwork: require('../../assets-prueba/images/BobSinclarLoveGeneration.jpg'),
        url:require('../../assets-prueba/songs/Bob_Sinclar_Love_Generation.mp3'),
    },
    {
        id: 8,
        title: 'Manos de tijera',
        artist: 'Camilo',
        artwork: require('../../assets-prueba/images/CamiloManosdeTijera.jpg'),
        url:require('../../assets-prueba/songs/Camilo_Manos_de_Tijera.mp3'),
    },
    {
        id: 9,
        title: 'Bebiendo Sola',
        artist: 'Camilo Myke Towers',
        artwork: require('../../assets-prueba/images/Camilo-Myke_Towers-Bebiendo_Sola.jpg'),
        url:require('../../assets-prueba/songs/Camilo_Myke_Towers_Bebiendo_Sola.mp3'),
    },
    {
        id: 10,
        title: 'Cuando nos volvamos a encontrar',
        artist: 'Carlos Vives',
        artwork: require('../../assets-prueba/images/Carlos_Vives-Cuando_Nos_Volvamos_A_Encontrar_Marc_Anthony.jpg'),
        url:require('../../assets-prueba/songs/Carlos_Vives_Cuando_Nos_Volvamos_a_Encontrar_ft_MarcAnthony.mp3'),
    },
    {
        id: 11,
        title: 'Dijeron que no la iba a lograr',
        artist: 'Chino Pacas',
        artwork: require('../../assets-prueba/images/Chino_PacasX Fuerza_RegidaDijeron_que_no_la_iba_lograr.jpg'),
        url:require('../../assets-prueba/songs/Chino_Pacas_X_Fuerza_Regida_Dijeron_que_no_la_iba_lograr .mp3'),
    },
    {
        id: 12,
        title: 'Claire de Lune',
        artist: 'Bethoveen',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ClairdeLune.mp3'),
    },
    {
        id: 13,
        title: 'Trouble',
        artist: 'Coldplay',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ColdplayTrouble.mp3'),
    },
    {
        id: 14,
        title: 'Me equivoque',
        artist: 'Ana Paula',
        artwork: require('../../assets-prueba/images/Crash_Ana_Paula_Me_Equivoqué.jpg'),
        url:require('../../assets-prueba/songs/CrashAnaPaulaMeEquivoqueVideo.mp3'),
    },
    {
        id: 15,
        title: 'Enamorado tuyo',
        artist: 'Unknown',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/Enamoradotuyo.mp3'),
    },
    {
        id: 16,
        title: 'Toca toca',
        artist: 'Fly project',
        artwork: require('../../assets-prueba/images/Fly_Project_Toca_Toca.jpg'),
        url:require('../../assets-prueba/songs/FlyProjectTocaToca.mp3'),
    },
    {
        id: 17,
        title: 'Un Montón de Estrellas',
        artist: 'Gilberto Santa Rosa',
        artwork: require('../../assets-prueba/images/Gilberto_Santa_Rosa_Un_Montón_de_Estrellas.jpg'),
        url:require('../../assets-prueba/songs/GilbertoSantaRosaUnMontondeEstrellas.mp3'),
    },
    {
        id: 18,
        title: 'Mi Salida Contigo',
        artist: 'HAASH Kenia OS',
        artwork: require('../../assets-prueba/images/HAASH_Kenia_OS_Mi_Salida_Contigo.jpg'),
        url:require('../../assets-prueba/songs/HAASHKeniaOSMiSalidaContigo.mp3'),
    },
    {
        id: 19,
        title: 'As it was',
        artist: 'Harry Styles',
        artwork: require('../../assets-prueba/images/As-it-was.png'),
        url:require('../../assets-prueba/songs/Harry-Styles-As-It-Was.mp3'),
    },
    {
        id: 20,
        title: 'Confieso',
        artist: 'Humbe',
        artwork: require('../../assets-prueba/images/Humbe_Confieso.jpg'),
        url:require('../../assets-prueba/songs/HumbeConfieso.mp3'),
    },
    {
        id: 21,
        title: 'Bones',
        artist: 'Imagine Dragons',
        artwork: require('../../assets-prueba/images/imagine_dragons_zero-portada.jpg'),
        url:require('../../assets-prueba/songs/ImagineDragonsBones.mp3'),
    },
    {
        id: 22,
        title: 'Demons',
        artist: 'Jacob Lee',
        artwork: require('../../assets-prueba/images/Jacob_Lee_Demons.jpg'),
        url:require('../../assets-prueba/songs/JacobLeeDemons.mp3'),
    },
    {
        id: 23,
        title: 'Cars Outside',
        artist: 'James Arthur',
        artwork: require('../../assets-prueba/images/James_Arthur_Cars_Outside.jpg'),
        url:require('../../assets-prueba/songs/JamesArthurCarsOutside.mp3'),
    },
    {
        id: 24,
        title: 'Im Yours',
        artist: 'Jason Mraz ',
        artwork: require('../../assets-prueba/images/ImYoursJasonMraz.jpg'),
        url:require('../../assets-prueba/songs/JasonMrazImYours.mp3'),
    },
    {
        id: 25,
        title: 'Ya No Quiero',
        artist: 'Jesse & Joy',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/JESSEJOYYaNoQuiero.mp3'),
    },
    {
        id: 26,
        title: 'Blaze Of Glory',
        artist: 'Jon Bon Jovi',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/JonBonJoviBlazeOfGlory.mp3'),
    },
    {
        id: 27,
        title: 'Chachacha',
        artist: 'Jósean Log',
        artwork: require('../../assets-prueba/images/Jósean_Log_Chachachá.jpg'),
        url:require('../../assets-prueba/songs/JoseanLogChachachA.mp3'),
    },
    {
        id: 28,
        title: 'Titanic',
        artist: 'Kany García Camilo',
        artwork: require('../../assets-prueba/images/kany_garcia_titanic-camilo.jpg'),
        url:require('../../assets-prueba/songs/KanyGarciaCamiloTitanic.mp3'),
    },
    {
        id: 29,
        title: 'Running Up That Hill',
        artist: 'Kate Bush',
        artwork: require('../../assets-prueba/images/Kate_Bush_Running_Up_That_Hill.jpg'),
        url:require('../../assets-prueba/songs/KateBushRunningUpThatHill.mp3'),
    },
    {
        id: 30,
        title: 'Big One  Un Finde',
        artist: 'Ke Personajes',
        artwork: require('../../assets-prueba/images/Ke_Personajes_Big_One_Un Finde.jpg'),
        url:require('../../assets-prueba/songs/KePersonajesFMKBigOneUnFinde.mp3'),
    },
    {
        id: 31,
        title: 'Everybodys Changing',
        artist: 'Keane',
        artwork: require('../../assets-prueba/images/Keane_Everybodys_Changing.jpg'),
        url:require('../../assets-prueba/songs/KeaneEverybodysChanging.mp3'),
    },
    {
        id: 32,
        title: 'Bang Bang',
        artist: 'Knaan ft Adam Levine',
        artwork: require('../../assets-prueba/images/K_naan-Bang_Bang_Adam_Levine.jpg'),
        url:require('../../assets-prueba/songs/KnaanftAdamLevineBangBang.mp3'),
    },
    {
        id: 33,
        title: 'All I Want',
        artist: 'Kodaline',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/KodalineAllIWant.mp3'),
    },
    {
        id: 34,
        title: 'La Mas Bella',
        artist: 'Afrodisiaco',
        artwork: require('../../assets-prueba/images/LaMasBellaAfrodisiaco.jpg'),
        url:require('../../assets-prueba/songs/LaMasBellaAfrodisiaco.mp3'),
    },
    {
        id: 35,
        title: 'Dealer',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Blue_Banisters.png'),
        url:require('../../assets-prueba/songs/LanaDelRey-Dealer.mp3'),
    },
    {
        id: 36,
        title: 'Let The Light In',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Lana_Del_Rey_Did_You_Know_That_There_s_a_Tunnel_Under_Ocean_Blvd.png'),
        url:require('../../assets-prueba/songs/LanaDelRey-LetTheLightInftFatherJohnMisty.mp3'),
    },
    {
        id: 37,
        title: 'Fiesta pagana',
        artist: 'Mägo de Oz',
        artwork: require('../../assets-prueba/images/Mägo_de_Oz_Fiesta-pagana.jpg'),
        url:require('../../assets-prueba/songs/MagodeOzFiestapagana.mp3'),
    },
    {
        id: 38,
        title: 'Desafiando el destino',
        artist: 'Maria Becerra',
        artwork: require('../../assets-prueba/images/Maria_Becerra_DESAFIANDO_EL_DESTINO.jpg'),
        url:require('../../assets-prueba/songs/MariaBecerraDESAFIANDOELDESTINO.mp3'),
    },
    {
        id: 39,
        title: 'Meet Me In The PaleMoonlight',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/unreleased_Lana_del_Rey.jpg'),
        url:require('../../assets-prueba/songs/Meet_Me_in_the_Pale_Moonlight.mp3'),
    },
    {
        id: 40,
        title: 'Earth Song',
        artist: 'Michael Jackson',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/MichaelJacksonEarthSong.mp3'),
    },
    {
        id: 41,
        title: 'CCC',
        artist: 'Michelle Maciel',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/MichelleMacielEdenMuñozCCC.mp3'),
    },
    {
        id: 42,
        title: 'Angels Like You',
        artist: 'Miley Cyrus',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/MileyCyrusAngelsLikeYou.mp3'),
    },
    {
        id: 43,
        title: 'Used To Be Young',
        artist: 'Miley Cyrus',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/MileyCyrusUsedToBeYoung.mp3'),
    },
    {
        id: 44,
        title: 'Don',
        artist: 'Miranda!',
        artwork: require('../../assets-prueba/images/Don.png'),
        url:require('../../assets-prueba/songs/Miranda!-Don.mp3'),
    },
    {
        id: 45,
        title: 'Pocketful of Sunshine',
        artist: 'Natasha Bedingfield',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/NatashaBedingfieldPocketfulofSunshine.mp3'),
    },
    {
        id: 46,
        title: 'Stop Crying Your Heart Out',
        artist: 'Oasis',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/OasisStopCryingYourHeartOut.mp3'),
    },
    {
        id: 47,
        title: 'They Dont Know About Us',
        artist: 'One Direction',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/OneDirectionTheyDontKnowAboutUs.mp3'),
    },
    {
        id: 48,
        title: 'Vivir Sin Ti No Puedo',
        artist: 'Pimpinela',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/PIMPINELAVIVIRSINTINOPUEDO.mp3'),
    },
    {
        id: 49,
        title: 'Pretty When You Cry',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/lana-del-rey-ultraviolence-cd.jpg'),
        url:require('../../assets-prueba/songs/PrettyWhenYouCry.mp3'),
    },

    {
        id: 50,
        title: 'Radio',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Born_To_Die.jpg'),
        url:require('../../assets-prueba/songs/RadioLanaDelRey.mp3'),
    },
    {
        id: 51,
        title: 'Si Me Dices Que Sí',
        artist: 'Reik Farruko Camilo',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ReikFarrukoCamiloSiMeDicesQueSi.mp3'),
    },
    {
        id: 52,
        title: 'El Problema',
        artist: 'Ricardo Arjona',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RicardoArjonaElProblema.mp3'),
    },
    {
        id: 53,
        title: 'Sera',
        artist: 'Ricardo Montaner',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RicardoMontanerSera.mp3'),
    },
    {
        id: 54,
        title: 'Sera porque te amo',
        artist: 'Ricchi E Poveri',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RicchiEPoveriSeraporqueteamo.mp3'),
    },
    {
        id: 55,
        title: 'Rises the moon',
        artist: 'Liana Flores',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/risesthemoon.mp3'),
    },
    {
        id: 56,
        title: 'Como un g',
        artist: 'Rosalia',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ROSALIACOMOUNG.mp3'),
    },
    {
        id: 58,
        title: 'LLYLM',
        artist: 'Rosalia',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ROSALIALLYLM.mp3'),
    },
    {
        id: 59,
        title: 'Runaround ',
        artist: 'Sue',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RunaroundSue.mp3'),
    },
    {
        id: 60,
        title: 'Smoke and Fire',
        artist: 'Sabrina Carpenter',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/SabrinaCarpenterSmokeandFire.mp3'),
    },
    {
        id: 61,
        title: 'Salvatore',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/Lana_Del_Rey_Honeymoon.png'),
        url:require('../../assets-prueba/songs/Salvatore.mp3'),
    },
    {
        id: 62,
        title: 'Acróstico',
        artist: 'Shakira',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ShakiraAcrostico.mp3'),
    },
    {
        id: 63,
        title: 'Mercy',
        artist: 'Shawn Mendes',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ShawnMendesMercy.mp3'),
    },
    {
        id: 64,
        title: 'Wonder',
        artist: 'Shawn Mendes',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ShawnMendesWonder.mp3'),
    },
    {
        id: 65,
        title: 'Stand Up',
        artist: 'Cynthia Erivo',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/StandUpCynthiaErivo.mp3'),
    },
    {
        id: 66,
        title: 'Dont You Worry Child',
        artist: 'Swedish House Mafia',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/SwedishHouseMafiaDontYouWorryChild.mp3'),
    },
    {
        id: 67,
        title: 'Love Story',
        artist: 'Taylor Swift',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/TaylorSwiftLoveStory.mp3'),
    },
    {
        id: 68,
        title: 'At the door',
        artist: 'The Strokes',
        artwork: require('../../assets-prueba/images/At-the-door.png'),
        url:require('../../assets-prueba/songs/The-Strokes-At-The-Door.mp3'),
    },
    {
        id: 69,
        title: 'Drops of Jupiter',
        artist: 'Train',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/TrainDropSofJupiter.mp3'),
    },
    {
        id: 70,
        title: 'Bet On It',
        artist: 'Troy',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/TroyBetOnIt.mp3'),
    },
    {
        id: 71,
        title: 'Unchained Melody',
        artist: ' Elvis Presley',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/UnchainedMelodyElvisPresley.mp3'),
    },
    {
        id: 72,
        title: 'Underdog ',
        artist: 'Alicia Keys',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/UnderdogAliciaKeys.mp3'),
    },

    {
        id: 73,
        title: 'Dream on',
        artist: 'Aerosmith',
        artwork: require('../../assets-prueba/images/Aerosmith_Dream_On.jpg'),
        url:require('../../assets-prueba/songs/Aerosmithdreamon.mp3'),
    },
    {
        id: 74,
        title: 'Volar',
        artist: 'Alvaro Soler ',
        artwork: require('../../assets-prueba/images/Alvaro_Soler_Volar.jpg'),
        url:require('../../assets-prueba/songs/AlvaroSolerVolar.mp3'),
    },
    {
        id: 75,
        title: 'Far From Home',
        artist: 'Amistat ',
        artwork: require('../../assets-prueba/images/AmistatFarFromHome.jpg'),
        url:require('../../assets-prueba/songs/AmistatFarFromHome.mp3'),
    },
    {
        id: 76,
        title: 'Left Outside Alone',
        artist: 'Anastacia',
        artwork: require('../../assets-prueba/images/AnastaciaLeftOutsideAlone.jpg'),
        url:require('../../assets-prueba/songs/AnastaciaLeftOutsideAlone.mp3'),
    },
    {
        id: 77,
        title: 'Apocalypse',
        artist: 'Cigarettes After Sex',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/Apocalypse-CigarettesAfterSex.mp3'),
    },
    {
        id: 78,
        title: 'Arhbo',
        artist: 'FIFA World Cup',
        artwork: require('../../assets-prueba/images/OzunaGIMSFIFAWorldCup2022.jpg'),
        url:require('../../assets-prueba/songs/ArhbofeaturingOzunaGIMSFIFAWorldCup2022.mp3'),
    },
    {
        id: 79,
        title: 'El Ladrón De Mi Sueño',
        artist: 'Beatriz Sanchez',
        artwork: require('../../assets-prueba/images/BeatrizSanchezElLadronDeMiSueno.jpg'),
        url:require('../../assets-prueba/songs/BeatrizSanchezElLadronDeMiSueno.mp3'),
    },
    {
        id: 80,
        title: 'Bowser Peaches',
        artist: 'Jack Black',
        artwork: require('../../assets-prueba/images/BowserPeachesByJackBlack.jpg'),
        url:require('../../assets-prueba/songs/BowserPeachesByJackBlack.mp3'),
    },
    {
        id: 81,
        title: 'Marry You',
        artist: 'Bruno Mars',
        artwork: require('../../assets-prueba/images/BrunoMarsMarryYou.jpg'),
        url:require('../../assets-prueba/songs/BrunoMarsMarryYou.mp3'),
    },
    {
        id: 82,
        title: 'El Mismo Aire',
        artist: 'Camilo Pablo Alboran',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/CamiloPabloAlboranElMismoAire.mp3'),
    },
    {
        id: 83,
        title: ' Pero Me Acuerdo De Tí',
        artist: 'Christina Aguilera',
        artwork: require('../../assets-prueba/images/Christina_Aguilera-Pero_Me_Acuerdo_De_Ti.jpg'),
        url:require('../../assets-prueba/songs/ChristinaAguileraPeroMeAcuerdoDeTi.mp3'),
    },
    {
        id: 48,
        title: 'A Sky Full Of Stars',
        artist: 'Coldplay ',
        artwork: require('../../assets-prueba/images/Coldplay_A_Sky_Full_Of_Stars.jpg'),
        url:require('../../assets-prueba/songs/ColdplayASkyFullOfStars.mp3'),
    },
    {
        id: 85,
        title: 'Clocks',
        artist: 'Coldplay',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/ColdplayClocks.mp3'),
    },
    {
        id: 86,
        title: 'Heather',
        artist: 'Conan Gray',
        artwork: require('../../assets-prueba/images/Conan_Gray_Heather.jpg'),
        url:require('../../assets-prueba/songs/ConanGrayHeather.mp3'),
    },
    {
        id: 87,
        title: 'Despues de Ti',
        artist: 'Octavia',
        artwork: require('../../assets-prueba/images/Después_de_Ti_Octavia.jpg'),
        url:require('../../assets-prueba/songs/DespuesdeTiOctavia.mp3'),
    },
    {
        id: 88,
        title: 'Celos',
        artist: 'Fanny Lu',
        artwork: require('../../assets-prueba/images/Fanny_Lu_Celos.jpg'),
        url:require('../../assets-prueba/songs/FannyLuCelos.mp3'),
    },
    {
        id: 89,
        title: 'Favorite Crime',
        artist: 'Olivia Rodrigo',
        artwork: require('../../assets-prueba/images/olivia_rodrigo_sour-portada.jpg'),
        url:require('../../assets-prueba/songs/FavoriteCrimeOliviaRodrigo.mp3'),
    },

    {
        id: 90,
        title: 'Cold Mine',
        artist: 'FIL BO RIVA',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/FILBORIVAColdMine.mp3'),
    },
    {
        id: 91,
        title: 'Bad Liar',
        artist: 'Glass Caves',
        artwork: require('../../assets-prueba/images/Glass_Caves_Bad_Liar.jpg'),
        url:require('../../assets-prueba/songs/GlassCavesBadLiar.mp3'),
    },
    {
        id: 92,
        title: 'Youre beautiful',
        artist: 'James Blunt',
        artwork: require('../../assets-prueba/images/James_Blunt_You_re_Beautiful.jpg'),
        url:require('../../assets-prueba/songs/JamesBluntYourebeautiful.mp3'),
    },
    {
        id: 93,
        title: 'Nothing Left To Say',
        artist: 'Imagine Dragons ',
        artwork: require('../../assets-prueba/images/Imagine_Dragons_Nothing_Left_To_Say.jpg'),
        url:require('../../assets-prueba/songs/ImagineDragonsNothingLeftToSay.mp3'),
    },
    {
        id: 94,
        title: 'Eres para Mí',
        artist: 'Julieta Venegas',
        artwork: require('../../assets-prueba/images/Julieta_Venegas-Eres_Para_Mi.jpg'),
        url:require('../../assets-prueba/songs/JulietaVenegasEresparaMi.mp3'),
    },
    {
        id: 99,
        title: 'The One',
        artist: 'Kodaline ',
        artwork: require('../../assets-prueba/images/kodaline_the_one-portada.jpg'),
        url:require('../../assets-prueba/songs/KodalineTheOne.mp3'),
    },
    {
        id: 96,
        title: 'Olvidar',
        artist: 'La Ley',
        artwork: require('../../assets-prueba/images/La_Ley_Olvidar.jpg'),
        url:require('../../assets-prueba/songs/LaLeyOlvidar.mp3'),
    },
    {
        id: 98,
        title: 'No Me Doy Por Vencido',
        artist: 'Luis Fonsi',
        artwork: require('../../assets-prueba/images/Luis_Fonsi-No_Me_Doy_Por_Vencido.jpg'),
        url:require('../../assets-prueba/songs/LuisFonsiNoMeDoyPorVencido.mp3'),
    },
    {
        id: 99,
        title: 'The Loneliest ',
        artist: 'Maneskin',
        artwork: require('../../assets-prueba/images/maneskin_the_loneliest-portada.jpg'),
        url:require('../../assets-prueba/songs/ManeskinTheLoneliest.mp3'),
    },
    {
        id: 100,
        title: 'El Único Habitante de tu Piel',
        artist: 'Melendi Carlos Rivera',
        artwork: require('../../assets-prueba/images/Melendi-Carlos-Rivera-ElUnico-Habitante-de-tu-Piel.jpg'),
        url:require('../../assets-prueba/songs/MelendiCarlosRiveraElUnicoHabitantedetuPiel.mp3'),
    },
    {
        id: 101,
        title: 'Esclavos del Silencio',
        artist: 'Meteoros',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/MeteorosEsclavosdelSilencio.mp3'),
    },
    {
        id: 102,
        title: 'Solo si',
        artist: 'Miguel Bose',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/MiguelBoseSolosiAudio.mp3'),
    },
    {
        id: 103,
        title: 'No te pido Flores',
        artist: 'Fanny Lu',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/NotepidoFloresFannyLu.mp3'),
    },
    {
        id: 104,
        title: 'Amigos',
        artist: 'Pablo Alboran María Becerra ',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/PabloAlboranMariaBecerraAmigos.mp3'),
    },
    {
        id: 105,
        title: 'Causa Y Efecto',
        artist: 'Paulina Rubio',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/PaulinaRubioCausaYEfecto.mp3'),
    },
    {
        id: 1010,
        title: 'Ni Una Sola Palabra',
        artist: 'Paulina Rubio',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/PaulinaRubioNiUnaSolaPalabra.mp3'),
    },
    {
        id: 107,
        title: 'Under Pressure',
        artist: 'Queen',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/QueenUnderPressure.mp3'),
    },
    {
        id: 108,
        title: 'Life Is A Highway',
        artist: 'Rascal Flatts',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RascalFlattsLifeIsAHighway.mp3'),
    },
    {
        id: 109,
        title: 'Mujer Amante',
        artist: 'Rata Blanca',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RataBlancaMujerAmante.mp3'),
    },
    {
        id: 110,
        title: 'Only Girl',
        artist: 'Rihanna',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RihannaOnlyGirl.mp3'),
    },
    {
        id: 111,
        title: 'Eres la Persona Correcta en el Momento Equivocado',
        artist: ' Río Roma ',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/RioRomaEreslaPersonaCorrectaenelMomentoEquivocado.mp3'),
    },
    {
        id: 112,
        title: 'Sad Girl ',
        artist: 'Lana del Rey',
        artwork: require('../../assets-prueba/images/lana-del-rey-ultraviolence-cd.jpg'),
        url:require('../../assets-prueba/songs/SadGirl.mp3'),
    },
    {
        id: 113,
        title: 'Courage To Change',
        artist: 'Sia',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/SiaCourageToChange.mp3'),
    },
    {
        id: 114,
        title: 'PROCURO OLVIDARTE',
        artist: 'Simone',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/SIMONEPROCUROOLVIDARTE.mp3'),
    },
    {
        id: 115,
        title: 'Que Lloro',
        artist: 'Sin Bandera',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/SinBanderaQueLloro.mp3'),
    },
    {
        id: 116,
        title: 'Si Tu No Estas',
        artist: 'Sin Bandera',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/SinBanderaSiTuNoEstas.mp3'),
    },
    {
        id: 117,
        title: 'Everybody wants to rule the world',
        artist: 'Tears For Fears',
        artwork: require('../../assets-prueba/images/Everybody-wants-to-rule-the-world.png'),
        url:require('../../assets-prueba/songs/Tears-For-Fears-Everybody-wants-to-rule-the-world.mp3'),
    },
    {
        id: 118,
        title: 'I Gotta Feeling',
        artist: 'The Black Eyed Peas',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/TheBlackEyedPeasIGottaFeeling.mp3'),
    },
    {
        id: 119,
        title: 'Angels',
        artist: 'Tom Walker',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/TomWalkerAngels.mp3'),
    },
    {
        id: 120,
        title: 'Hey Soul Sister',
        artist: 'Train',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/TrainHeySoulSister.mp3'),
    },
    {
        id: 121,
        title: 'Fondo Profundo',
        artist: 'Vilma Palma E Vampiros ',
        artwork: require('../../assets-prueba/images/desconocida.png'),
        url:require('../../assets-prueba/songs/VilmaPalmaEVampirosFondoProfundo.mp3'),
    },
    
];

export default songs;