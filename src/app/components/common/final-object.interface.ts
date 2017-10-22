export interface FinalObject {
  inputDir: string;   // later may support array of many input directories
  outputDir: string;  // always just one -- for screenshots and JSON file
  images: Array<any>; // see below
}

/*
Each item in the images array is formatted thus:

  [
0    'string: partial path to file',    <--- for opening the file, just prepend the `inputDir`
1    'string: full original file name', <--- for opening the file
2    'string: file name cleaned of dots, underscores, and file extension' <--- for searching
3    'number: of the filename' <--- e.g. 42 - file with screenshots 42-0.jpg, 42-1.jpg, etc
4    'number: duration' <-- duration of film as number
5    'string: depicting size', <-- e.g. `720`, `1080`, `SD`, `HD`
6    'number: width of screenshot', <-- e.g 124 etc
  ]

*/
