TRELLO-länk
https://trello.com/b/wPnO3knd/kandidatrapport

Google kalender-länk
https://calendar.google.com/calendar/u/0/embed?src=oqg0kbdhsvddjlbbq4pugm5j5k@group.calendar.google.com&ctz=Europe/Stockholm

stående zoom länk scrum
https://liu-se.zoom.us/j/69401782162


Git-kommandon

git branch -a - visa alla branches (lokala)
git fetch --all - visa alla branches på remote repos (gitlab-servern)
git checkout -b "branchnamn" - byt till ny branch med namn "branchnamn". DÖP BRANCHEN TILL DEN ISSUE-NUMMER NI ARBETAR PÅ (t.ex Erik13 om Erik jobbar på issue nr 13). Skapar man en branch på det här sättet blir det en lokal branch, om man vill att den ska hamna i online-reposet använder man git push origin "branchnamn".
(man kan skapa nya branches direkt i GitLab också)
git checkout "existerande branch" - byt till en existerande branch (t.ex för att byta till master: "existerande branch" = origin/master)
origin är ett sätt att skriva att skriva att man vill åt remote-reposet (gitlab i vårt fall)
för att deleta en remote branch, skriv git push "remotenamn" --delete "branchnamn" (där "remote-namn" är origin, eller hela namnet på reposet om man känner för det)
för att deleta en local branch, git branch -d "branchnamn"
git pull
git commit -m "meddelande"
git push
hej
hej
hej
