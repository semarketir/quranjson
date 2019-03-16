# بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

### Quran JSON
> 6236 verses, 114 surah, 30 Juz'


### Folder structure for Qur'an JSON
```sh
.
├── LICENSE
├── README.md
└── source
    ├── audio
    │   └── <surah_index:001-114>
    │       ├── <verse:1-n>.mp3
    │       └── index.json
    ├── juz.json
    ├── surah
    │   └── surah_<number:1-114>.json
    ├── tajweed
    │   └── surah_<number:1-114>.json
    ├── surah.json
    └── translation
        └── <language_code:e_g:id-en-etc>
            └── <language_code>_translation_<number_of_surah:1-114>.json
```

##### Surah
- surah.json

##### Juz'
- juz.json

##### Surah ( Arabic )
- surah/surah_1.json
- surah/surah_2.json
- surah/surah_n.json

##### Surah ( Arabic ) format
- surah/surah_SURAHNUMBER.json

##### Tajweed
- tajweed/surah_1.json
- tajweed/surah_2.json
- tajweed/surah_n.json

##### Tajweed format
- tajweed/surah_SURAHNUMBER.json

##### Audio
- audio/002/001.mp3
- audio/002/002.mp3
- audio/002/003.mp3

##### Audio index
- audio/001/index.json

##### Audio format
- audio/SURAHNUMBER/VERSENUMBER_OR_AYATNUMBER.mp3
- audio/SURAHNUMBER/index.json

##### Translation
- translation/id/id_translation_1.json
- translation/id/id_translation_2.json
- translation/id/id_translation_n.json

##### Translation format
- translation/LANGUAGE/LANGUAGE_translation_SURAHNUMBER.json

##### HOST : Raw
- https://raw.githubusercontent.com/semarketir/quranjson/master/source/*
- https://rawgit.com/semarketir/quranjson/master/source/*

##### Example : Raw
- [https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json](https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json)
- [https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_1.json](https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_1.json)

##### Example : Raw Format
- https://raw.githubusercontent.com/semarketir/quranjson/BRANCH/SOURCE_OR_DIST/FOLDER/FILE.json

##### License
[MIT License](http://opensource.org/licenses/mit-license.php)
