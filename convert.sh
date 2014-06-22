#!/bin/bash
 
for file in ./products/*
do
  convert -define jpeg:size=500x500 $file -thumbnail 200x200^ -gravity center -extent 200x200  dist/products/$(basename $file)
done