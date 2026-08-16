yeah so these are the repos of my teammates
https://github.com/sumitprajapatismr/hybrid-video-lms.git
https://github.com/Astheticon-Archive/hybrid-video-lms.git
https://github.com/JejjiShankarRao/hybrid-video-lms.git
https://github.com/madhavisahani852/hybrid-video-lms.git
https://github.com/MrSubhash2005/hybrid-video-lms.git

so each one of them is working on a partucualr course and have updated to make their video sync to aduio or extend their videos
check each repo and each branch and whatever was last updated is the updated code
few instructions
the final output (our final prod is an api providing the courses with any ai celeb with any voice)
we aim for any but since credits of sarvam api is issue we are gonna have fallback of 2 voices(2 male nad 2 female)
this should be stored in repo either as cache or somehting else so even if they are running for the first time the video should play if they dont have sarvam api key 
SARVAM_API_KEY_ENV_3


SARVAM_API_KEY_ENV_3



SARVAM_API_KEY=SARVAM_API_KEY_ENV_1


SARVAM_API_KEY_ENV_2


well these are the api keys for now to generate voices
use them to make videos to be stored

first compare all the repos check if 2 are of same course pick the repo thats best and implement that in our main code

for deciding what voice  model to choose u can use openrouter any free model to find if the name is male or female etc

openrouter api=OPENROUTER_API_KEY_ENV

start coding the goal is get a completed api that gives videos all the best!