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
    "language-label": "Language:",
    "language-placeholder": "Select a language",
    "language-en": "English",
    "language-id": "Indonesian",
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
    "language-label": "Bahasa:",
    "language-placeholder": "Pilih bahasa",
    "language-en": "Inggris",
    "language-id": "Indonesia",
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
            "back-button": "Kembali"
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
