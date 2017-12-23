for img in `find . -name "*.[jJ][pP][gG]" `; do 
magick convert -rotate "90" $img $img-resized; 
rm $img;
mv $img-resized $img 
echo $img 
done 

for img in `find . -name "*.[pP][nN][gG]"`; do 
magick convert -rotate "90" $img $img-resized; 
rm $img;
mv $img-resized $img 
echo $img 
done 

