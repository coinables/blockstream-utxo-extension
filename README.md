# blockstream-utxo-extension
browse the blockstream explorer with visual tool to build raw transactions from specific UTXOs

In chrome go to More Tools then Extensions
Enable Developer Mode
Load Unpacked Extension, point to this folder.
Visit an address on the blockstream explorer
Click the icon and press "Target Page"

The interface is still buggy and only can select one UTXO per page load. Also 1 input max, up to 2 outputs max.

Sign the unsigned transactions by copying the unsigned transaction hex and pasting it into the signor.html file. 
Enter your private key and click sign button. 
You can now broadcast the signed transaction. 
