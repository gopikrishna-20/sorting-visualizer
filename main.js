

//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
//var array_speed=document.getElementById('a_speed').value;

var butts_algos=document.querySelectorAll(".algos button");

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

//Array generation and updation.

inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);

function generate_array()
{
    cont.innerHTML="";

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_as.max - inp_as.min) ) + 10;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function update_array_size()
{
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function runalgo()
{
    disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
    }
}

function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput !== "") {
        displayMessage(userInput, 'user');
        processUserInput(userInput);
        document.getElementById("userInput").value = ""; // Clear input after sending
    }
}

function displayMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

/*function processUserInput(userInput) {
    let response = "";

    if (userInput.toLowerCase().includes("bubble")) {
        response = `Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. 
        Here's how Bubble Sort works with the array [5, 3, 8, 4, 2]:\n

        1. First pass: Compare 5 and 3, swap. Compare 5 and 8, no swap. Compare 8 and 4, swap. Compare 8 and 2, swap.
        Array after first pass: [3, 5, 4, 2, 8]

        2. Second pass: Compare 3 and 5, no swap. Compare 5 and 4, swap. Compare 5 and 2, swap.
        Array after second pass: [3, 4, 2, 5, 8]

        3. Third pass: Compare 3 and 4, no swap. Compare 4 and 2, swap.
        Array after third pass: [3, 2, 4, 5, 8]

        4. Fourth pass: Compare 3 and 2, swap.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes("insertion")) {
        response = `Insertion Sort builds a sorted array one element at a time. It compares the current element to its predecessors, inserting it in the correct position.
        Here's how Insertion Sort works with the array [5, 3, 8, 4, 2]:

        1. Start with the first element 5. Since it's the only element, it's already sorted.

        2. Compare 3 with 5. Since 3 < 5, move 5 to the right and insert 3 before it.
        Array after step 2: [3, 5, 8, 4, 2]

        3. Compare 8 with 5. Since 8 > 5, no movement is needed.
        Array after step 3: [3, 5, 8, 4, 2]

        4. Compare 4 with 8. Move 8 to the right, then compare 4 with 5, move 5 to the right, and insert 4 before 5.
        Array after step 4: [3, 4, 5, 8, 2]

        5. Compare 2 with 8, 5, 4, and 3, and move them all to the right. Insert 2 at the beginning.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes("merge")) {
        response = `Merge Sort is a divide-and-conquer algorithm that splits the array in half, sorts each half, and merges them back together.
        Here's how Merge Sort works with the array [5, 3, 8, 4, 2]:

        1. Split the array into two halves: [5, 3, 8] and [4, 2].

        2. Split [5, 3, 8] into [5] and [3, 8]. Split [3, 8] into [3] and [8]. Merge [3] and [8] into [3, 8].

        3. Merge [5] and [3, 8] into [3, 5, 8].

        4. Split [4, 2] into [4] and [2]. Merge [4] and [2] into [2, 4].

        5. Merge [3, 5, 8] and [2, 4] into [2, 3, 4, 5, 8].
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes("quick")) {
        response = `Quick Sort selects a 'pivot' element and partitions the array so that all elements less than the pivot are on the left, and all elements greater are on the right.
        Here's how Quick Sort works with the array [5, 3, 8, 4, 2]:

        1. Choose 5 as the pivot. Partition the array into two parts: [3, 4, 2] and [8].

        2. Recursively apply Quick Sort to the left part [3, 4, 2]:
           - Choose 3 as the pivot. Partition into [2] and [4].
           - The left part is now sorted as [2, 3, 4].

        3. Combine the sorted left part, the pivot (5), and the right part [8].
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes("heap")) {
        response = `Heap Sort turns the array into a max heap (where the largest element is at the root), and then repeatedly swaps the root with the last element and rebuilds the heap.
        Here's how Heap Sort works with the array [5, 3, 8, 4, 2]:

        1. Build a max heap from the array. The max heap is [8, 4, 5, 3, 2].

        2. Swap the root (8) with the last element (2), then rebuild the heap.
        Array after step 2: [5, 4, 2, 3, 8]

        3. Swap the new root (5) with the second last element (3), then rebuild the heap.
        Array after step 3: [4, 3, 2, 5, 8]

        4. Repeat until the array is sorted.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayMessage(response, 'bot');
    } else if (userInput.toLowerCase().includes("selection")) {
        response = `Selection Sort repeatedly finds the minimum element and swaps it with the first unsorted element.
        Here's how Selection Sort works with the array [5, 3, 8, 4, 2]:

        1. Find the minimum element (2) and swap it with the first element (5).
        Array after step 1: [2, 3, 8, 4, 5]

        2. Find the next minimum (3) and swap it with itself (no change).
        Array after step 2: [2, 3, 8, 4, 5]

        3. Find the next minimum (4) and swap it with 8.
        Array after step 3: [2, 3, 4, 8, 5]

        4. Find the next minimum (5) and swap it with 8.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayMessage(response, 'bot');
    } else {
        response = "I can explain sorting algorithms like Bubble Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and Selection Sort. Ask me about any one of them!";
        displayMessage(response, 'bot');
    }
}
*/







/*function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput !== "") {
        displayMessage(userInput, 'user');
        processUserInput(userInput);
        document.getElementById("userInput").value = ""; // Clear input after sending
    }
}

function displayMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

function displayLineByLine(message, sender) {
    const lines = message.split('\n');
    let delay = 0;
    lines.forEach((line, index) => {
        setTimeout(() => {
            displayMessage(line, sender);
        }, delay);
        delay += 500; // Delay each line by 500ms
    });
}

function processUserInput(userInput) {
    let response = "";

    if (userInput.toLowerCase().includes("bubble")) {
        response = `Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. 
        Here's how Bubble Sort works with the array [5, 3, 8, 4, 2]:\n

        1. First pass: Compare 5 and 3, swap. Compare 5 and 8, no swap. Compare 8 and 4, swap. Compare 8 and 2, swap.
        Array after first pass: [3, 5, 4, 2, 8]\n

        2. Second pass: Compare 3 and 5, no swap. Compare 5 and 4, swap. Compare 5 and 2, swap.
        Array after second pass: [3, 4, 2, 5, 8]\n

        3. Third pass: Compare 3 and 4, no swap. Compare 4 and 2, swap.
        Array after third pass: [3, 2, 4, 5, 8]\n

        4. Fourth pass: Compare 3 and 2, swap.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayLineByLine(response, 'bot');

        // Provide C code if requested
        if (userInput.toLowerCase().includes("code")) {
            const bubbleSortCode = `
            // Bubble Sort in C
            #include <stdio.h>
            
            void bubbleSort(int arr[], int n) {
                int i, j, temp;
                for (i = 0; i < n-1; i++) {
                    for (j = 0; j < n-i-1; j++) {
                        if (arr[j] > arr[j+1]) {
                            temp = arr[j];
                            arr[j] = arr[j+1];
                            arr[j+1] = temp;
                        }
                    }
                }
            }

            void printArray(int arr[], int size) {
                int i;
                for (i = 0; i < size; i++) {
                    printf("%d ", arr[i]);
                }
                printf("\\n");
            }

            int main() {
                int arr[] = {5, 3, 8, 4, 2};
                int n = sizeof(arr)/sizeof(arr[0]);
                bubbleSort(arr, n);
                printf("Sorted array: \\n");
                printArray(arr, n);
                return 0;
            }
            `;
            displayLineByLine(bubbleSortCode, 'bot');
        }
    } else if (userInput.toLowerCase().includes("insertion")) {
        response = `Insertion Sort builds a sorted array one element at a time. It compares the current element to its predecessors, inserting it in the correct position.
        Here's how Insertion Sort works with the array [5, 3, 8, 4, 2]:\n

        1. Start with the first element 5. Since it's the only element, it's already sorted.\n

        2. Compare 3 with 5. Since 3 < 5, move 5 to the right and insert 3 before it.
        Array after step 2: [3, 5, 8, 4, 2]\n

        3. Compare 8 with 5. Since 8 > 5, no movement is needed.
        Array after step 3: [3, 5, 8, 4, 2]\n

        4. Compare 4 with 8. Move 8 to the right, then compare 4 with 5, move 5 to the right, and insert 4 before 5.
        Array after step 4: [3, 4, 5, 8, 2]\n

        5. Compare 2 with 8, 5, 4, and 3, and move them all to the right. Insert 2 at the beginning.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayLineByLine(response, 'bot');

        // Provide C code if requested
        if (userInput.toLowerCase().includes("code")) {
            const insertionSortCode = `
            // Insertion Sort in C
            #include <stdio.h>

            void insertionSort(int arr[], int n) {
                int i, key, j;
                for (i = 1; i < n; i++) {
                    key = arr[i];
                    j = i - 1;

                    while (j >= 0 && arr[j] > key) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
                    arr[j + 1] = key;
                }
            }

            void printArray(int arr[], int size) {
                int i;
                for (i = 0; i < size; i++) {
                    printf("%d ", arr[i]);
                }
                printf("\\n");
            }

            int main() {
                int arr[] = {5, 3, 8, 4, 2};
                int n = sizeof(arr)/sizeof(arr[0]);
                insertionSort(arr, n);
                printf("Sorted array: \\n");
                printArray(arr, n);
                return 0;
            }
            `;
            displayLineByLine(insertionSortCode, 'bot');
        }
    }
    // Similarly, add other algorithms such as Merge Sort, Quick Sort, Heap Sort, and Selection Sort
    // along with their respective C code.
    else {
        response = "I can explain sorting algorithms like Bubble Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and Selection Sort. Ask me about any one of them!";
        displayLineByLine(response, 'bot');
    }
}

*/


function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput !== "") {
        displayMessage(userInput, 'user');
        processUserInput(userInput);
        document.getElementById("userInput").value = ""; // Clear input after sending
    }
}

function displayMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

function displayLineByLine(message, sender) {
    const lines = message.split('\n');
    let delay = 0;
    lines.forEach((line, index) => {
        setTimeout(() => {
            displayMessage(line, sender);
        }, delay);
        delay += 500; // Delay each line by 500ms
    });
}

function processUserInput(userInput) {
    let response = "";

    if (userInput.toLowerCase().includes("bubble")) {
        response = `Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. 
        Here's how Bubble Sort works with the array [5, 3, 8, 4, 2]:\n

        1. First pass: Compare 5 and 3, swap. Compare 5 and 8, no swap. Compare 8 and 4, swap. Compare 8 and 2, swap.
        Array after first pass: [3, 5, 4, 2, 8]\n

        2. Second pass: Compare 3 and 5, no swap. Compare 5 and 4, swap. Compare 5 and 2, swap.
        Array after second pass: [3, 4, 2, 5, 8]\n

        3. Third pass: Compare 3 and 4, no swap. Compare 4 and 2, swap.
        Array after third pass: [3, 2, 4, 5, 8]\n

        4. Fourth pass: Compare 3 and 2, swap.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayLineByLine(response, 'bot');

        // Provide C code if requested
        if (userInput.toLowerCase().includes("code")) {
            const bubbleSortCode = `
            // Bubble Sort in C
            #include <stdio.h>
            
            void bubbleSort(int arr[], int n) {
                int i, j, temp;
                for (i = 0; i < n-1; i++) {
                    for (j = 0; j < n-i-1; j++) {
                        if (arr[j] > arr[j+1]) {
                            temp = arr[j];
                            arr[j] = arr[j+1];
                            arr[j+1] = temp;
                        }
                    }
                }
            }

            void printArray(int arr[], int size) {
                int i;
                for (i = 0; i < size; i++) {
                    printf("%d ", arr[i]);
                }
                printf("\\n");
            }

            int main() {
                int arr[] = {5, 3, 8, 4, 2};
                int n = sizeof(arr)/sizeof(arr[0]);
                bubbleSort(arr, n);
                printf("Sorted array: \\n");
                printArray(arr, n);
                return 0;
            }
            `;
            displayLineByLine(bubbleSortCode, 'bot');
        }
    } else if (userInput.toLowerCase().includes("insertion")) {
        response = `Insertion Sort builds a sorted array one element at a time. It compares the current element to its predecessors, inserting it in the correct position.
        Here's how Insertion Sort works with the array [5, 3, 8, 4, 2]:\n

        1. Start with the first element 5. Since it's the only element, it's already sorted.\n

        2. Compare 3 with 5. Since 3 < 5, move 5 to the right and insert 3 before it.
        Array after step 2: [3, 5, 8, 4, 2]\n

        3. Compare 8 with 5. Since 8 > 5, no movement is needed.
        Array after step 3: [3, 5, 8, 4, 2]\n

        4. Compare 4 with 8. Move 8 to the right, then compare 4 with 5, move 5 to the right, and insert 4 before 5.
        Array after step 4: [3, 4, 5, 8, 2]\n

        5. Compare 2 with 8, 5, 4, and 3, and move them all to the right. Insert 2 at the beginning.
        Final sorted array: [2, 3, 4, 5, 8]`;

        displayLineByLine(response, 'bot');

        // Provide C code if requested
        if (userInput.toLowerCase().includes("code")) {
            const insertionSortCode = `
            // Insertion Sort in C
            #include <stdio.h>

            void insertionSort(int arr[], int n) {
                int i, key, j;
                for (i = 1; i < n; i++) {
                    key = arr[i];
                    j = i - 1;

                    while (j >= 0 && arr[j] > key) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
                    arr[j + 1] = key;
                }
            }

            void printArray(int arr[], int size) {
                int i;
                for (i = 0; i < size; i++) {
                    printf("%d ", arr[i]);
                }
                printf("\\n");
            }

            int main() {
                int arr[] = {5, 3, 8, 4, 2};
                int n = sizeof(arr)/sizeof(arr[0]);
                insertionSort(arr, n);
                printf("Sorted array: \\n");
                printArray(arr, n);
                return 0;
            }
            `;
            displayLineByLine(insertionSortCode, 'bot');
        }
    }
    // Similarly, add other algorithms such as Merge Sort, Quick Sort, Heap Sort, and Selection Sort
    // along with their respective C code.
    else {
        response = "I can explain sorting algorithms like Bubble Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and Selection Sort. Ask me about any one of them!";
        displayLineByLine(response, 'bot');
    }
}








    

