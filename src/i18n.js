import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "start": "Start",
            "current": "Current",
            "goal": "Goal",
            "not-a-word": "This is not a recognised word.",
            "already-chosen": "You have already used this word.",
            "incorrect-length": "Words must be 5 letters long.",
            "too-many-modifications": "You can only change one letter per turn.",
            "congratulations": "Congratulations!",
            "streak": "Day Streak!",
            "choices": "Choices",
            "time": "Time",
            "try-again": "Try Again",
            "share": "Share",
            "donate": "Donate",
            "donate-link": "https://paypal.me/JosephDaunt",
            "help": "Help",
            "how-to-play": "How to Play",
            "example-game": "Example Game",
            "changing-word-choices": "Changing your word choices",
            "sharing-words": "Sharing your words",
            "help-play-introduction": "As you write the words, the ones you've chosen will appear above the keyboard. You can go back to a previous word by selecting that word.",
            "help-play-navigation": "Until you have added a new word, you can still go forward again to your previous word if you went back accidentally or decided your original choice was the best.",
            "game-aim": "The aim of the game is to get from your starting word to the final word.",
            "game-rules": "Each turn make an anagram of the previous word and change one letter. The two words will change every day - but there will always be a solution in 5 steps.",
            "share-instructions": "Once you have finished the puzzle you can share with friends by clicking on the share button and then pasting the link into your social media.",
            "settings-title": "Settings",
            "language-label": "Language:  🇺🇳",
            "language-placeholder": "Select a language",
            "language-en": " 🇬🇧 English",
            "language-id": " 🇮🇩 Indonesian",
            "language-uk": " 🇺🇦 українська",
            "font-label": "Font:",
            "font-placeholder": "Select a font",
            "font-basic": "Basic",
            "font-bubble": "Bubble",
            "font-mono": "Mono",
            "layout-label": "Keyboard Layout:",
            "layout-placeholder": "Select a layout",
            "layout-standard": "Standard",
            "layout-inverted": "Inverted",
            "results-title": "Shared Results",
            "their-time": "Their Time:",
            "your-time": "Your Time:",
            "play-button": "Play",
            "motivation-todays-puzzle": "Solve today's puzzle to see their words",
            "motivation-future-puzzle": "Solve this puzzle when it becomes available in your time zone",
            "motivation-past-puzzle": "This puzzle is from a previous day",
            "their-words-title": "Their Words",
            "your-words-title": "Your Words",
            "share-text": "Play Pick and Mix with me!\n{{url}}\n\n{{emojiText}}",
            "clipboard-success": "Copied to Clipboard",
            "time-to-next-puzzle": "Time to next puzzle",
            "hour-short": "h",
            "minute-short": "m",
            "second-short": "s",
            "puzzle-path-title": "With the starting word OUGHT and the goal word SPEAK",
            "puzzle-step-1": "OUGHT - SOUTH (changing G to S)",
            "puzzle-step-2": "SOUTH - THOSE (changing U to E)",
            "puzzle-step-3": "THOSE - HATES (changing O to A)",
            "puzzle-step-4": "HATES - SHAKE (changing T to K)",
            "puzzle-step-5": "SHAKE - SPEAK (changing H to P)",
            "back-button": "Go Back"
        }
    },
    id: {
        translation: {
            "start": "Mulai",
            "current": "Saat Ini",
            "goal": "Tujuan",
            "not-a-word": "Ini bukan kata yang dikenali.",
            "already-chosen": "Anda sudah menggunakan kata ini.",
            "incorrect-length": "Kata harus terdiri dari 5 huruf.",
            "too-many-modifications": "Anda hanya dapat mengubah satu huruf per giliran.",
            "congratulations": "Selamat!",
            "streak": "Rentetan Hari!",
            "choices": "Pilihan",
            "time": "Waktu",
            "try-again": "Coba Lagi",
            "share": "Bagikan",
            "donate": "Donasi",
            "donate-link": "https://paypal.me/JosephDaunt",
            "help": "Bantuan",
            "how-to-play": "Cara Bermain",
            "example-game": "Contoh Permainan",
            "changing-word-choices": "Mengubah pilihan kata Anda",
            "sharing-words": "Membagikan kata-kata Anda",
            "help-play-introduction": "Saat Anda menulis kata-kata, kata-kata yang telah Anda pilih akan muncul di atas papan ketik. Anda dapat kembali ke kata sebelumnya dengan memilih kata tersebut.",
            "help-play-navigation": "Sampai Anda menambahkan kata baru, Anda masih dapat maju lagi ke kata sebelumnya jika Anda kembali secara tidak sengaja atau memutuskan pilihan asli Anda adalah yang terbaik.",
            "game-aim": "Tujuan permainan ini adalah untuk berpindah dari kata awal Anda ke kata akhir.",
            "game-rules": "Setiap giliran, buatlah anagram dari kata sebelumnya dan ubah satu huruf. Dua kata akan berubah setiap hari, dan Anda memerlukan hanya 5 langkah untuk berpindah dari kata pertama ke kata akhir.",
            "share-instructions": "Setelah Anda menyelesaikan teka-teki, Anda dapat membagikannya dengan teman-teman dengan mengklik tombol bagikan dan kemudian menempelkan tautan ke media sosial Anda.",
            "settings-title": "Pengaturan",
            "language-label": "Bahasa:  🇺🇳",
            "language-placeholder": "Pilih bahasa",
            "language-en": " 🇬🇧 English",
            "language-id": " 🇮🇩 Indonesia",
            "language-uk": " 🇺🇦 українська",
            "font-label": "Font:",
            "font-placeholder": "Pilih font",
            "font-basic": "Dasar",
            "font-bubble": "Gelembung",
            "font-mono": "Mono",
            "layout-label": "Tata Letak Keyboard:",
            "layout-placeholder": "Pilih tata letak",
            "layout-standard": "Standar",
            "layout-inverted": "Terbalik",
            "results-title": "Hasil yang Dibagikan",
            "their-time": "Waktu Mereka:",
            "your-time": "Waktu Anda:",
            "play-button": "Mainkan",
            "motivation-todays-puzzle": "Selesaikan teka-teki hari ini untuk melihat kata-kata mereka",
            "motivation-future-puzzle": "Selesaikan teka-teki ini saat tersedia di zona waktu Anda",
            "motivation-past-puzzle": "Teka-teki ini dari hari sebelumnya",
            "their-words-title": "Kata-Kata Mereka",
            "your-words-title": "Kata-Kata Anda",
            "share-text": "Mainkan Pick and Mix dengan saya!\n{{url}}\n\n{{emojiText}}",
            "clipboard-success": "Disalin ke Papan Klip",
            "time-to-next-puzzle": "Waktu hingga teka-teki berikutnya",
            "hour-short": "j",
            "minute-short": "m",
            "second-short": "d",
            "puzzle-path-title": "Dengan kata awal KABUT dan kata tujuan RESMI",
            "puzzle-step-1": "KABUT - TABUR (ganti K dengan R)",
            "puzzle-step-2": "TABUR - REBUT (ganti A dengan E)",
            "puzzle-step-3": "REBUT - TERUS (ganti B dengan S)",
            "puzzle-step-4": "TERUS - SEMUR (ganti T dengan M)",
            "puzzle-step-5": "SEMUR - RESMI (ganti U dengan I)",
            "back-button": "Kembali"
        }
    },
    uk: {
        translation: {
            "start": "Старт",
            "current": "Поточне",
            "goal": "Мета",
            "not-a-word": "Це не визнане слово.",
            "already-chosen": "Ви вже використали це слово.",
            "incorrect-length": "Слова мають бути довжиною 5 літер.",
            "too-many-modifications": "Можна змінити лише одну літеру за хід.",
            "congratulations": "Вітання!",
            "streak": "Денна серія!",
            "choices": "Вибори",
            "time": "Час",
            "try-again": "Спробуйте ще раз",
            "share": "Поділитися",
            "donate": "Пожертвувати",
            "donate-link": "https://novaukraine.org",
            "help": "Допомога",
            "how-to-play": "Як грати",
            "example-game": "Приклад гри",
            "changing-word-choices": "Зміна вибору слів",
            "sharing-words": "Обмін словами",
            "help-play-introduction": "Під час введення слів вибрані вами слова з'являтимуться над клавіатурою. Ви можете повернутися до попереднього слова, вибравши його.",
            "help-play-navigation": "Поки ви не додали нове слово, ви все ще можете перейти вперед до свого попереднього слова, якщо повернулися випадково або вирішили, що ваш початковий вибір найкращий.",
            "game-aim": "Мета гри - дійти від початкового слова до кінцевого.",
            "game-rules": "Кожен хід утворюйте анаграму попереднього слова та змінюйте одну літеру. Два слова змінюватимуться щодня – але завжди є рішення в 5 кроків.",
            "share-instructions": "Після завершення головоломки ви можете поділитися з друзями, натиснувши кнопку поділитися, а потім вставивши посилання у свої соціальні мережі.",
            "settings-title": "Налаштування",
            "language-label": "Мова:  🇺🇳",
            "language-placeholder": "Виберіть мову",
            "language-en": " 🇬🇧 English",
            "language-id": " 🇮🇩 Indonesian",
            "language-uk": " 🇺🇦 українська",
            "font-label": "Шрифт:",
            "font-placeholder": "Виберіть шрифт",
            "font-basic": "Основний",
            "font-bubble": "Бульбашка",
            "font-mono": "Моно",
            "layout-label": "Розкладка клавіатури:",
            "layout-placeholder": "Виберіть розкладку",
            "layout-standard": "Стандартна",
            "layout-inverted": "Інвертована",
            "results-title": "Поділені результати",
            "their-time": "Їх час:",
            "your-time": "Ваш час:",
            "play-button": "Грати",
            "motivation-todays-puzzle": "Розв'яжіть сьогоднішню головоломку, щоб побачити їх слова",
            "motivation-future-puzzle": "Розв'яжіть цю головоломку, коли вона стане доступною у вашому часовому поясі",
            "motivation-past-puzzle": "Ця головоломка з попереднього дня",
            "their-words-title": "Їхні слова",
            "your-words-title": "Ваші слова",
            "share-text": "Грайте зі мною в Pick and Mix!\n{{url}}\n\n{{emojiText}}",
            "clipboard-success": "Скопійовано в буфер обміну",
            "time-to-next-puzzle": "Час до наступної головоломки",
            "hour-short": "г",
            "minute-short": "хв",
            "second-short": "с",
            "puzzle-path-title": "З початковим словом OUGHT і кінцевим словом SPEAK",
            "puzzle-step-1": "OUGHT - SOUTH (заміна G на S)",
            "puzzle-step-2": "SOUTH - THOSE (заміна U на E)",
            "puzzle-step-3": "THOSE - HATES (заміна O на A)",
            "puzzle-step-4": "HATES - SHAKE (заміна T на K)",
            "puzzle-step-5": "SHAKE - SPEAK (заміна H на P)",
            "back-button": "Назад"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
