export interface ComplexityCase {
  value: string;
  explanation: string;
}

export interface SubTopic {
  id: string;
  title: string;
  definition: string;
  complexity: {
    time: {
      best: ComplexityCase;
      average: ComplexityCase;
      worst: ComplexityCase;
    };
    space: ComplexityCase;
  };
  boilerplates: {
    language: "Python" | "Java";
    code: string;
  }[];
  whenToUse: string;
  whenNotToUse: string;
  leetCodeLinks: { title: string; url: string; difficulty: "Easy" | "Medium" | "Hard" }[];
  visualizationId?: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "dsa" | "system-design";
  icon: string;
  topics: string[];
  problemCount: number;
  phase: string;
  phaseId: number;
  section: string;
  prerequisites?: string[];
  subTopics?: SubTopic[];
  platformResources?: {
    visualizer?: string;
    playground?: string;
    problemArena?: string[];
    extra?: string;
  };
}

export const dsaRoadmap: RoadmapNode[] = [
  // PHASE 1
  {
    id: "programming-basics",
    title: "Programming Basics",
    description: "Choose your language and set up your development environment.",
    icon: "💻",
    problemCount: 0,
    topics: ["Language Choice", "IDE Setup", "Input/Output", "Basic Syntax"],
    phase: "Phase 1",
    phaseId: 1,
    section: "1.0",
    difficulty: "beginner",
    category: "dsa",
    subTopics: [
      {
        id: "language-selection",
        title: "Language Selection",
        definition: "Choosing the right programming language for DSA involves balancing readability, performance, and library support. Python, C++, Java, and JavaScript are the world's most popular choices.",
        complexity: {
          time: {
            best: { value: "N/A", explanation: "Language selection is a conceptual choice, not an algorithmic process." },
            average: { value: "N/A", explanation: "Language selection is a conceptual choice, not an algorithmic process." },
            worst: { value: "N/A", explanation: "Language selection is a conceptual choice, not an algorithmic process." }
          },
          space: { value: "N/A", explanation: "Language selection does not consume computational space." }
        },
        boilerplates: [
          { language: "Python", code: "# Python: Minimal syntax, great for rapid prototyping\nprint(\"Hello, DSA!\")" },
          { language: "Java", code: "// Java: Strongly typed, excellent for understanding OOP in DSA\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, DSA!\");\n    }\n}" }
        ],
        whenToUse: "Use Python for interviews to focus on logic. Use C++ or Java for competitive programming or system-level performance.",
        whenNotToUse: "Don't switch languages frequently; pick one and master its standard library (STL, Collections, etc.).",
        leetCodeLinks: []
      },
      {
        id: "environment-setup",
        title: "Environment Setup",
        definition: "A productive coding environment includes a powerful IDE (like VS Code or IntelliJ), the language compiler/interpreter, and a solid debugger.",
        complexity: {
          time: {
            best: { value: "N/A", explanation: "Setup is a one-time configuration." },
            average: { value: "N/A", explanation: "Setup is a one-time configuration." },
            worst: { value: "N/A", explanation: "Setup is a one-time configuration." }
          },
          space: { value: "N/A", explanation: "Setup is a one-time configuration." }
        },
        boilerplates: [
          { language: "Python", code: "# Run script using: python script.py" },
          { language: "Java", code: "// Compile: javac Main.java\n// Run: java Main" }
        ],
        whenToUse: "Always set up a local environment for complex debugging that online compilers can't handle.",
        whenNotToUse: "For quick brain-teasers or very simple tasks, a simple online playground is sufficient.",
        leetCodeLinks: []
      }
    ]
  },
  {
    id: "arrays",
    title: "Arrays",
    description: "Contiguous memory, static vs dynamic arrays, and fundamental operations.",
    difficulty: "beginner",
    category: "dsa",
    icon: "📊",
    topics: ["Static vs Dynamic", "Prefix Sum", "Kadane's Algorithm", "Two Pointers"],
    problemCount: 15,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.1",
    prerequisites: ["Programming Basics"],
    subTopics: [
      {
        id: "array-traversal",
        title: "Array Traversal & Indexing",
        definition: "The most fundamental array operation. Accessing elements by index and iterating through the entire collection to perform lookups, updates, or calculations.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Accessing an element by index or appending (when capacity exists) is O(1)." },
            average: { value: "O(1)", explanation: "Average time for access and amortized append is O(1)." },
            worst: { value: "O(n)", explanation: "Insertion at the beginning or middle, or appending when resizing is required, takes O(n) time." }
          },
          space: { value: "O(n)", explanation: "Memory consumed is proportional to the number of elements stored." }
        },
        boilerplates: [
          { language: "Python", code: "# Iterating through an array\narr = [1, 2, 3]\nfor x in arr: print(x)\n# Access by index\nval = arr[0] # O(1)" },
          { language: "Java", code: "int[] arr = {1, 2, 3};\nfor(int x : arr) System.out.println(x);\n// Access by index\nint val = arr[0]; // O(1)" }
        ],
        whenToUse: "When you need fast index-based access and additions are mostly at the end.",
        whenNotToUse: "When frequent insertions or deletions at the beginning or middle are required.",
        leetCodeLinks: [
          { title: "Concatenation of Array", url: "https://leetcode.com/problems/concatenation-of-array/", difficulty: "Easy" }
        ],
        visualizationId: "arrays"
      },
      {
        id: "prefix-sum",
        title: "Prefix Sum",
        definition: "A prefix sum is an array where each element at index i is the sum of all elements from the original array up to index i. It allows O(1) time range sum queries.",
        complexity: {
          time: {
            best: { value: "O(n)", explanation: "Preprocessing always requires one full pass over the array." },
            average: { value: "O(n)", explanation: "Preprocessing always requires one full pass over the array." },
            worst: { value: "O(n)", explanation: "Preprocessing always requires one full pass over the array." }
          },
          space: { value: "O(n)", explanation: "Requires an auxiliary array of size n to store the sums." }
        },
        boilerplates: [
          { language: "Python", code: "def get_prefix_sum(nums):\n    prefix = [0] * (len(nums) + 1)\n    for i in range(len(nums)):\n        prefix[i+1] = prefix[i] + nums[i]\n    return prefix" },
          { language: "Java", code: "public int[] getPrefixSum(int[] nums) {\n    int[] prefix = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) {\n        prefix[i + 1] = prefix[i] + nums[i];\n    }\n    return prefix;\n}" }
        ],
        whenToUse: "When you need to perform multiple range sum queries on an array that doesn't change frequently.",
        whenNotToUse: "When the array is frequently updated, as each update would require O(n) to rebuild the prefix sum.",
        leetCodeLinks: [
          { title: "Range Sum Query - Immutable", url: "https://leetcode.com/problems/range-sum-query-immutable/", difficulty: "Easy" },
        ],
        visualizationId: "arrays"
      },
      {
        id: "kadanes-algorithm",
        title: "Kadane's Algorithm",
        definition: "An iterative dynamic programming algorithm used to find the maximum sum subarray within a one-dimensional array of numbers.",
        complexity: {
          time: {
            best: { value: "O(n)", explanation: "Always requires a single pass through the array." },
            average: { value: "O(n)", explanation: "Standard linear scan of the array." },
            worst: { value: "O(n)", explanation: "Each element is visited exactly once." }
          },
          space: { value: "O(1)", explanation: "Only uses two variables to track the current and maximum subarrays." }
        },
        boilerplates: [
          { language: "Python", code: "def max_subarray(nums):\n    max_so_far = float('-inf')\n    current_max = 0\n    for x in nums:\n        current_max += x\n        if max_so_far < current_max: max_so_far = current_max\n        if current_max < 0: current_max = 0\n    return max_so_far" },
          { language: "Java", code: "public int maxSubArray(int[] nums) {\n    int maxSoFar = Integer.MIN_VALUE, currentMax = 0;\n    for (int x : nums) {\n        currentMax += x;\n        if (maxSoFar < currentMax) maxSoFar = currentMax;\n        if (currentMax < 0) currentMax = 0;\n    }\n    return maxSoFar;\n}" }
        ],
        whenToUse: "Finding the maximum sum of a contiguous subarray in an array with both positive and negative numbers.",
        whenNotToUse: "When you need to find more than just the sum (e.g., the actual subarray indices may need slight modification).",
        leetCodeLinks: [
          { title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium" }
        ],
        visualizationId: "arrays"
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        definition: "A technique where two pointers move through the data structure (usually an array or string) either in the same direction or towards each other to solve a problem efficiently.",
        complexity: {
          time: {
            best: { value: "O(n)", explanation: "Two pointers usually traverse the input at most once." },
            average: { value: "O(n)", explanation: "Standard problems like Two Sum (sorted) take linear time." },
            worst: { value: "O(n)", explanation: "Each pointer traverses the length of the input independently." }
          },
          space: { value: "O(1)", explanation: "Only uses a constant amount of extra space for the pointers." }
        },
        boilerplates: [
          { language: "Python", code: "def two_sum(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        curr = nums[left] + nums[right]\n        if curr == target: return [left, right]\n        if curr < target: left += 1\n        else: right -= 1" },
          { language: "Java", code: "public int[] twoSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int curr = nums[left] + nums[right];\n        if (curr == target) return new int[]{left, right};\n        if (curr < target) left++;\n        else right--;\n    }\n    return new int[]{};\n}" }
        ],
        whenToUse: "On sorted arrays, or when searching for pairs/triplets with specific properties.",
        whenNotToUse: "If the input is not sorted and sorting it would exceed the time limit.",
        leetCodeLinks: [
          { title: "Two Sum II", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Medium" },
          { title: "Trapping Rain Water", url: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard" }
        ],
        visualizationId: "arrays"
      }
    ],
  },
  {
    id: "strings",
    title: "Strings",
    description: "String manipulation, immutability, and pattern matching algorithms.",
    difficulty: "beginner",
    category: "dsa",
    icon: "🔤",
    topics: ["Pattern Matching (KMP, Rabin-Karp)", "Anagrams", "Palindromes"],
    problemCount: 10,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.2",
    prerequisites: ["Arrays"],
    subTopics: [
      {
        id: "string-manipulation",
        title: "String Manipulation & Search",
        definition: "Strings are sequences of characters. In many languages (like Python and Java), strings are immutable, meaning any modification creates a new string object.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Accessing a character by index is constant time." },
            average: { value: "O(n)", explanation: "String concatenation or searching typically takes linear time." },
            worst: { value: "O(n)", explanation: "Most string operations depend on the length of the string." }
          },
          space: { value: "O(n)", explanation: "Storing a string of length n requires linear space." }
        },
        boilerplates: [
          { language: "Python", code: "s = \"hello\"\n# s[0] = 'H'  # Error! Strings are immutable\ns = \"H\" + s[1:] # O(n) creation of new string" },
          { language: "Java", code: "String s = \"hello\";\n// s.charAt(0) = 'H'; // Error!\ns = \"H\" + s.substring(1); // O(n) creation of new string" }
        ],
        whenToUse: "Use when dealing with text, identifiers, or simple sequences of printable characters.",
        whenNotToUse: "Avoid repeated concatenations in a loop; use a list/StringBuilder instead.",
        leetCodeLinks: [
          { title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy" }
        ],
        visualizationId: "strings"
      },
      {
        id: "palindromes",
        title: "Palindrome Check (Two Pointers)",
        definition: "A palindrome is a string that reads the same forwards and backwards. Reversing a string is a fundamental operation often solved with two pointers.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "If the first and last characters don't match, we know it's not a palindrome immediately." },
            average: { value: "O(n)", explanation: "We usually check characters from both ends until they meet in the middle." },
            worst: { value: "O(n)", explanation: "In the case of a palindrome, we must check every character pair." }
          },
          space: { value: "O(1)", explanation: "Using two pointers on the original string requires no extra space." }
        },
        boilerplates: [
          { language: "Python", code: "def is_palindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]: return False\n        l += 1; r -= 1\n    return True" },
          { language: "Java", code: "public boolean isPalindrome(String s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        if (s.charAt(l) != s.charAt(r)) return false;\n        l++; r--;\n    }\n    return true;\n}" }
        ],
        whenToUse: "Common pattern in string validation and symmetric data processing.",
        whenNotToUse: "N/A",
        leetCodeLinks: [
          { title: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy" }
        ],
        visualizationId: "strings"
      }
    ],
    platformResources: {
      visualizer: "KMP failure function, Rabin-Karp rolling hash",
      problemArena: ["Longest Substring Without Repeating Characters", "Minimum Window Substring"]
    }
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Pointer manipulation, singly/doubly linked lists, and cycle detection.",
    difficulty: "beginner",
    category: "dsa",
    icon: "🔗",
    topics: ["Reverse LL", "Floyd's Cycle Detection", "LRU Cache"],
    problemCount: 8,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.3",
    prerequisites: ["Pointers/References"],
    subTopics: [
      {
        id: "list-traversal",
        title: "List Traversal & Search",
        definition: "A linear data structure where each element (node) contains a value and a pointer to the next node in the sequence.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Accessing the head or adding/removing from the head is constant time." },
            average: { value: "O(n)", explanation: "Accessing or searching for an element requires traversing the list." },
            worst: { value: "O(n)", explanation: "Operations like searching or deleting from the tail take linear time." }
          },
          space: { value: "O(n)", explanation: "Storing n nodes requires linear space." }
        },
        boilerplates: [
          { language: "Python", code: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next" },
          { language: "Java", code: "public class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}" }
        ],
        whenToUse: "When you need frequent insertions/deletions at the beginning of the list and don't need random access.",
        whenNotToUse: "When you need constant time access to elements by index.",
        leetCodeLinks: [
          { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy" }
        ],
        visualizationId: "linked-list"
      },
      {
        id: "detect-cycles",
        title: "Floyd's Cycle-Finding Algorithm",
        definition: "Using two pointers (slow and fast) to detect if a linked list contains a loop. If they meet, a cycle exists.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "If there's no next node, we know there's no cycle immediately." },
            average: { value: "O(n)", explanation: "The pointers will meet within a constant number of cycles through the list." },
            worst: { value: "O(n)", explanation: "We might traverse the entire list before detecting a cycle or end." }
          },
          space: { value: "O(1)", explanation: "Only uses two pointers regardless of the input size." }
        },
        boilerplates: [
          { language: "Python", code: "def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False" },
          { language: "Java", code: "public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}" }
        ],
        whenToUse: "To detect loops in linked lists or solve circular sequence problems.",
        whenNotToUse: "When the list is guaranteed to be acyclic or is too small to matter.",
        leetCodeLinks: [
          { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy" }
        ],
        visualizationId: "linked-list"
      }
    ]
  },
  {
    id: "stacks",
    title: "Stacks",
    description: "LIFO data structure, balanced parentheses, and monotonic stacks.",
    difficulty: "beginner",
    category: "dsa",
    icon: "📚",
    topics: ["Push/Pop/Peek", "Monotonic Stack", "Histogram Problems"],
    problemCount: 6,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.4",
    prerequisites: ["Linked Lists or Arrays"],
    subTopics: [
      {
        id: "stack-basics",
        title: "Stack Push/Pop Operations",
        definition: "A stack follows the 'Last In, First Out' principle. The last element added is the first one to be removed, similar to a stack of plates.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Push, Pop, and Peek are always constant time." },
            average: { value: "O(1)", explanation: "Standard implementation using arrays or linked lists takes constant time." },
            worst: { value: "O(1)", explanation: "Even in the worst case, these operations don't depend on the stack size." }
          },
          space: { value: "O(n)", explanation: "Stores n elements in memory." }
        },
        boilerplates: [
          { language: "Python", code: "stack = []\nstack.append(1) # Push\nstack.pop() # Pop\nval = stack[-1] # Peek" },
          { language: "Java", code: "Stack<Integer> stack = new Stack<>();\nstack.push(1); // Push\nstack.pop(); // Pop\nint val = stack.peek(); // Peek" }
        ],
        whenToUse: "Undo mechanisms, expression evaluation, depth-first search (DFS).",
        whenNotToUse: "When you need to access elements in the middle or end of the structure.",
        leetCodeLinks: [
          { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" }
        ],
        visualizationId: "stacks"
      }
    ],
    platformResources: {
      visualizer: "Monotonic stack step-through",
      problemArena: ["Valid Parentheses", "Largest Rectangle in Histogram"]
    }
  },
  {
    id: "queues",
    title: "Queues",
    description: "FIFO data structure, deques, and sliding window optimizations.",
    difficulty: "beginner",
    category: "dsa",
    icon: "🚶",
    topics: ["Enqueue/Dequeue", "Circular Queue", "Sliding Window Max"],
    problemCount: 5,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.5",
    prerequisites: ["Stacks"],
    subTopics: [
      {
        id: "queue-basics",
        title: "Queue Enqueue/Dequeue",
        definition: "A queue follows the 'First In, First Out' principle. The first element added is the first one to be removed, like a line at a grocery store.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Enqueue, Dequeue, and Peek are always constant time." },
            average: { value: "O(1)", explanation: "Standard implementation using arrays or linked lists takes constant time." },
            worst: { value: "O(1)", explanation: "Even in the worst case, these operations don't depend on the queue size." }
          },
          space: { value: "O(n)", explanation: "Stores n elements in memory." }
        },
        boilerplates: [
          { language: "Python", code: "from collections import deque\nq = deque()\nq.append(1) # Enqueue\nq.popleft() # Dequeue\nval = q[0] # Peek" },
          { language: "Java", code: "Queue<Integer> q = new LinkedList<>();\nq.add(1); // Enqueue\nq.poll(); // Dequeue\nint val = q.peek(); // Peek" }
        ],
        whenToUse: "Breadth-first search (BFS), task scheduling, handling asynchronous data.",
        whenNotToUse: "When you need to access or remove items from the middle.",
        leetCodeLinks: [
          { title: "Implement Stack using Queues", url: "https://leetcode.com/problems/implement-stack-using-queues/", difficulty: "Easy" }
        ],
        visualizationId: "queues"
      }
    ],
    platformResources: {
      visualizer: "Circular queue animation, deque sliding window demo",
      problemArena: ["Implement Queue Using Stacks", "Task Scheduler"]
    }
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    description: "Hash functions, collision resolution, and O(1) average lookup.",
    difficulty: "beginner",
    category: "dsa",
    icon: "🗂️",
    topics: ["Chaining", "Open Addressing", "Rehashing", "Prefix Sum + Maps"],
    problemCount: 10,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.6",
    prerequisites: ["Arrays", "Simple Math"],
    subTopics: [
      {
        id: "hashing-concept",
        title: "Hash Map Operations",
        definition: "Hashing maps data of arbitrary size to fixed-size values. Collisions occur when two keys map to the same index, resolved by chaining or open addressing.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Accessing an element by key is constant time if there are no collisions." },
            average: { value: "O(1)", explanation: "Standard hash maps achieve constant time for most operations." },
            worst: { value: "O(n)", explanation: "If many keys hash to the same index (collisions), performance degrades to linear time." }
          },
          space: { value: "O(n)", explanation: "Stores n key-value pairs in memory." }
        },
        boilerplates: [
          { language: "Python", code: "d = {}\nd[\"key\"] = \"value\"\nif \"key\" in d: print(d[\"key\"])" },
          { language: "Java", code: "HashMap<String, String> map = new HashMap<>();\nmap.put(\"key\", \"value\");\nif (map.containsKey(\"key\")) System.out.println(map.get(\"key\"));" }
        ],
        whenToUse: "O(1) lookups, counting frequencies, checking for existence.",
        whenNotToUse: "When you need to keep data in a specific order.",
        leetCodeLinks: [
          { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" }
        ],
        visualizationId: "hash-tables"
      }
    ],
    platformResources: {
      visualizer: "Collision resolution animations, rehashing walkthrough",
      problemArena: ["Subarray Sum Equals K", "Longest Consecutive Sequence"]
    }
  },
  {
    id: "trees",
    title: "Trees",
    description: "Hierarchical structures, binary trees, BSTs, and traversals.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "🌳",
    topics: ["Traversals (In/Pre/Post/Level)", "Diameter", "BST Operations", "Segment Trees"],
    problemCount: 12,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.7",
    prerequisites: ["Recursion basics", "Queues (for BFS)"],
    subTopics: [
      {
        id: "tree-traversal",
        title: "Tree Traversal (DFS/BFS)",
        definition: "Methods for visiting all nodes in a tree. DFS (In-order, Pre-order, Post-order) uses a stack/recursion, while BFS uses a queue.",
        complexity: {
          time: {
            best: { value: "O(n)", explanation: "Every node must be visited exactly once." },
            average: { value: "O(n)", explanation: "Standard traversals visit each node linearly." },
            worst: { value: "O(n)", explanation: "All nodes are visited regardless of tree structure." }
          },
          space: { value: "O(n)", explanation: "Requires space for the recursion stack (DFS) or queue (BFS) proportional to tree height or width." }
        },
        boilerplates: [
          { language: "Python", code: "def inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)" },
          { language: "Java", code: "public List<Integer> inorderTraversal(TreeNode root) {\n    List<Integer> res = new ArrayList<>();\n    helper(root, res);\n    return res;\n}\nprivate void helper(TreeNode root, List<Integer> res) {\n    if (root == null) return;\n    helper(root.left, res);\n    res.add(root.val);\n    helper(root.right, res);\n}" }
        ],
        whenToUse: "Searching, sorting (BST), hierarchical data representation.",
        whenNotToUse: "When data is linear and doesn't have a parent-child relationship.",
        leetCodeLinks: [
          { title: "Binary Tree Inorder Traversal", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "Easy" }
        ],
        visualizationId: "trees"
      }
    ],
    platformResources: {
      visualizer: "Full traversal animator, BST operations, Segment Tree range query",
      problemArena: ["Validate BST", "Lowest Common Ancestor", "Serialize/Deserialize Binary Tree"]
    }
  },
  {
    id: "heaps",
    title: "Heaps",
    description: "Complete binary trees as arrays, priority queues, and heapify.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "⛰️",
    topics: ["Min/Max Heap", "Heapify", "Median in a Stream", "Merge K Sorted"],
    problemCount: 7,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.8",
    prerequisites: ["Binary Trees", "Complexity Analysis"],
    subTopics: [
      {
        id: "heap-basics",
        title: "Min/Max Heap & Priority Queue",
        definition: "A specialized tree-based data structure that satisfies the heap property. In a min-heap, the parent is always smaller than its children.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Peek (accessing the root) is always constant time." },
            average: { value: "O(log n)", explanation: "Insertion and deletion (extraction) require heapifying, which take logarithmic time." },
            worst: { value: "O(log n)", explanation: "In the worst case, we must bubble up or down the entire height of the tree." }
          },
          space: { value: "O(n)", explanation: "Stores n elements in an array or tree structure." }
        },
        boilerplates: [
          { language: "Python", code: "import heapq\nh = []\nheapq.heappush(h, 5) # Insert\nval = h[0] # Peek\nmin_val = heapq.heappop(h) # Extract min" },
          { language: "Java", code: "PriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(5); // Insert\nint val = pq.peek(); // Peek\nint min_val = pq.poll(); // Extract min" }
        ],
        whenToUse: "Finding Top-K elements, scheduling, priority-based processing.",
        whenNotToUse: "When you need to search for an arbitrary element efficiently.",
        leetCodeLinks: [
          { title: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium" }
        ],
        visualizationId: "heaps"
      }
    ],
    platformResources: {
      visualizer: "Heap tree ↔ array sync, two-heaps median tracker",
      problemArena: ["Top K Frequent Elements", "Find Median From Data Stream"]
    }
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Networks, BFS/DFS, shortest paths, and spanning trees.",
    difficulty: "advanced",
    category: "dsa",
    icon: "🕸️",
    topics: ["Adjacency List/Matrix", "Dijkstra/Bellman-Ford", "Topological Sort", "MST (Prims/Kruskals)"],
    problemCount: 15,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.9",
    prerequisites: ["Recursion", "Queues", "Heaps (for Dijkstra)"],
    subTopics: [
      {
        id: "graph-representation",
        title: "Graph Representations",
        definition: "Graphs consist of vertices and edges. Common representations include Adjacency Lists (memory efficient) and Adjacency Matrices (fast edge lookup).",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "Edge lookup in an adjacency matrix is constant time." },
            average: { value: "O(V+E)", explanation: "Most graph traversals (BFS/DFS) take linear time relative to vertices and edges." },
            worst: { value: "O(V^2)", explanation: "Some algorithms or dense matrix representations can reach quadratic time." }
          },
          space: { value: "O(V+E)", explanation: "Adjacency list requires space for all vertices and their edges." }
        },
        boilerplates: [
          { language: "Python", code: "graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}" },
          { language: "Java", code: "List<List<Integer>> adj = new ArrayList<>();\nfor(int i=0; i<V; i++) adj.add(new ArrayList<>());\nadj.get(0).add(1); adj.get(0).add(2);" }
        ],
        whenToUse: "Modeling networks, social connections, maps, and dependencies.",
        whenNotToUse: "When data is strictly hierarchical (use a Tree).",
        leetCodeLinks: [
          { title: "Find if Path Exists in Graph", url: "https://leetcode.com/problems/find-if-path-exists-in-graph/", difficulty: "Easy" }
        ],
        visualizationId: "graphs"
      }
    ],
    platformResources: {
      visualizer: "Interactive graph builder, shortest path animator, MST highlighter",
      problemArena: ["Number of Islands", "Course Schedule", "Alien Dictionary"]
    }
  },
  // PHASE 2
  {
    id: "searching",
    title: "Searching",
    description: "Linear and Binary Search, and searching on monotonic conditions.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "🔍",
    topics: ["Binary Search", "Lower/Upper Bound", "Binary Search on Answer"],
    problemCount: 8,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.1",
    prerequisites: ["Arrays"],
    subTopics: [
      {
        id: "binary-search-basics",
        title: "Binary Search",
        definition: "An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "The target element is exactly at the middle of the array on the first check." },
            average: { value: "O(log n)", explanation: "Each step reduces the search space by half." },
            worst: { value: "O(log n)", explanation: "In the worst case, we continue halving until the search space is empty." }
          },
          space: { value: "O(1)", explanation: "Iterative binary search uses only a constant amount of extra space." }
        },
        boilerplates: [
          { language: "Python", code: "def binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == target: return mid\n        if arr[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1" },
          { language: "Java", code: "public int binarySearch(int[] arr, int target) {\n    int l = 0, r = arr.length - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}" }
        ],
        whenToUse: "When you have a sorted array and need to find an element or a range boundary.",
        whenNotToUse: "If the data is unsorted and sorting it would be more expensive than linear search.",
        leetCodeLinks: [
          { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/", difficulty: "Easy" }
        ],
        visualizationId: "binary-search"
      }
    ],
    platformResources: {
      visualizer: "Binary search step animator, searching-on-answer visual",
      problemArena: ["Search in Rotated Sorted Array", "Koko Eating Bananas"]
    }
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Comparison-based and non-comparison sorts and their trade-offs.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "🔀",
    topics: ["Merge/Quick Sort", "Comparison Sorts", "Counting/Radix Sort"],
    problemCount: 8,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.2",
    prerequisites: ["Arrays", "Recursion"],
    subTopics: [
      {
        id: "merge-sort",
        title: "Merge Sort",
        definition: "A divide-and-conquer algorithm that divides an array into halves, sorts them, and then merges the sorted halves.",
        complexity: {
          time: {
            best: { value: "O(n log n)", explanation: "The array is always divided and merged regardless of the initial order." },
            average: { value: "O(n log n)", explanation: "Standard performance for divide-and-conquer sorting." },
            worst: { value: "O(n log n)", explanation: "Guaranteed O(n log n) even in the worst case." }
          },
          space: { value: "O(n)", explanation: "Requires auxiliary space for merging the subarrays." }
        },
        boilerplates: [
          { language: "Python", code: "def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)" },
          { language: "Java", code: "void mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}" }
        ],
        whenToUse: "When stability is required or for sorting linked lists.",
        whenNotToUse: "When memory is tight (as it requires O(n) extra space).",
        leetCodeLinks: [
          { title: "Sort an Array", url: "https://leetcode.com/problems/sort-an-array/", difficulty: "Medium" }
        ],
        visualizationId: "sorting"
      }
    ],
    platformResources: {
      visualizer: "Sorting race (all algorithms), merge step visualizer",
      problemArena: ["Sort Colors", "Merge Intervals"]
    }
  },
  {
    id: "backtracking",
    title: "Recursion & Backtracking",
    description: "Exploring state spaces and finding all possible solutions.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "🔄",
    topics: ["Recursion Framework", "State Space Search", "N-Queens", "Permutations"],
    problemCount: 10,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.3",
    prerequisites: ["Recursion basics", "Stack concept"],
    subTopics: [
      {
        id: "backtracking-basics",
        title: "Backtracking Concept",
        definition: "A refined recursion technique that builds candidates for a solution and abandons a candidate ('backtracks') as soon as it determines the candidate cannot lead to a valid solution.",
        complexity: {
          time: {
            best: { value: "O(k)", explanation: "The first candidate path leads to a solution (where k is the solution depth)." },
            average: { value: "O(2^n)", explanation: "Backtracking often explores an exponential number of possible paths." },
            worst: { value: "O(n!)", explanation: "For problems like Permutations, we may explore all n! arrangements." }
          },
          space: { value: "O(n)", explanation: "Proportional to the depth of the recursion tree." }
        },
        boilerplates: [
          { language: "Python", code: "def backtrack(path, options):\n    if is_solution(path):\n        result.append(path[:]); return\n    for opt in options:\n        if is_valid(opt):\n            path.append(opt)\n            backtrack(path, remaining_options)\n            path.pop() # Backtrack" },
          { language: "Java", code: "private void backtrack(List<Integer> path, int[] options) {\n    if (isSolution(path)) {\n        result.add(new ArrayList<>(path)); return;\n    }\n    for (int opt : options) {\n        if (isValid(opt)) {\n            path.add(opt);\n            backtrack(path, remainingOptions);\n            path.remove(path.size() - 1);\n        }\n    }\n}" }
        ],
        whenToUse: "Finding all permutations, subsets, solving Sudoku, or N-Queens.",
        whenNotToUse: "When a greedy or DP approach can find the solution in polynomial time.",
        leetCodeLinks: [
          { title: "Subsets", url: "https://leetcode.com/problems/subsets/", difficulty: "Medium" }
        ],
        visualizationId: "backtracking"
      }
    ],
    platformResources: {
      visualizer: "Recursion tree builder, backtracking state animator",
      problemArena: ["Subsets", "Combination Sum", "Sudoku Solver"]
    }
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    description: "Optimizing recursive solutions with memoization and tabulation.",
    difficulty: "advanced",
    category: "dsa",
    icon: "🧩",
    topics: ["Memoization", "Tabulation", "0/1 Knapsack", "LIS/LCS"],
    problemCount: 20,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.5",
    prerequisites: ["Backtracking", "Phase 1.1"],
    subTopics: [
      {
        id: "dp-memoization",
        title: "Memoization (Top-Down)",
        definition: "An optimization technique where you store the results of expensive function calls and return the cached result when the same inputs occur again.",
        complexity: {
          time: {
            best: { value: "O(1)", explanation: "The result for the given input is already in the cache." },
            average: { value: "O(n)", explanation: "Each unique state is computed only once." },
            worst: { value: "O(n)", explanation: "Total time is proportional to the number of unique states in the subproblem tree." }
          },
          space: { value: "O(n)", explanation: "Requires extra space (hash map or array) to store the results of states." }
        },
        boilerplates: [
          { language: "Python", code: "memo = {}\ndef dp(n):\n    if n in [0, 1]: return n\n    if n not in memo:\n        memo[n] = dp(n-1) + dp(n-2)\n    return memo[n]" },
          { language: "Java", code: "int[] memo;\npublic int fib(int n) {\n    memo = new int[n + 1];\n    return helper(n);\n}\nprivate int helper(int n) {\n    if (n <= 1) return n;\n    if (memo[n] != 0) return memo[n];\n    return memo[n] = helper(n-1) + helper(n-2);\n}" }
        ],
        whenToUse: "When you have overlapping subproblems and optimal substructure.",
        whenNotToUse: "When subproblems do not overlap (use plain recursion).",
        leetCodeLinks: [
          { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy" }
        ],
        visualizationId: "dp"
      }
    ],
    platformResources: {
      visualizer: "DP table fill animator, Knapsack highlighter, LCS diagonal",
      problemArena: ["Climbing Stairs", "Longest Increasing Subsequence", "Edit Distance"]
    }
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms",
    description: "Making locally optimal choices to find global solutions.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "💰",
    topics: ["Activity Selection", "Huffman Coding", "Interval Scheduling"],
    problemCount: 8,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.6",
    prerequisites: ["Sorting", "Heaps"],
    subTopics: [
      {
        id: "greedy-basics",
        title: "Greedy Strategy",
        definition: "An algorithmic paradigm that follows the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum.",
        complexity: {
          time: {
            best: { value: "O(n log n)", explanation: "Usually dominated by the sorting step required for the greedy choice." },
            average: { value: "O(n log n)", explanation: "Common performance for greedy algorithms involving sorting or priority queues." },
            worst: { value: "O(n log n)", explanation: "Sorting all elements takes linearithmic time." }
          },
          space: { value: "O(1)", explanation: "Often operates in-place or uses minimal extra variables." }
        },
        boilerplates: [
          { language: "Python", code: "def max_activities(activities):\n    activities.sort(key=lambda x: x[1])\n    count = 0; last_end = -1\n    for start, end in activities:\n        if start >= last_end:\n            count += 1; last_end = end\n    return count" },
          { language: "Java", code: "Arrays.sort(activities, (a, b) -> Integer.compare(a[1], b[1]));\nint count = 0, lastEnd = -1;\nfor (int[] act : activities) {\n    if (act[0] >= lastEnd) {\n        count++; lastEnd = act[1];\n    }\n}" }
        ],
        whenToUse: "When a locally optimal choice leads to a globally optimal solution (e.g., Interval Scheduling, Huffman Coding).",
        whenNotToUse: "In problems where local choices may prevent a global optimum (e.g., 0/1 Knapsack).",
        leetCodeLinks: [
          { title: "Gas Station", url: "https://leetcode.com/problems/gas-station/", difficulty: "Medium" }
        ],
        visualizationId: "greedy"
      }
    ],
    platformResources: {
      visualizer: "Activity selection timeline, Huffman tree builder",
      problemArena: ["Gas Station", "Non-Overlapping Intervals"]
    }
  },
  {
    id: "sliding-window-pointers",
    title: "Two Pointers & Sliding Window",
    description: "Optimization techniques for array and string processing.",
    difficulty: "intermediate",
    category: "dsa",
    icon: "🪟",
    topics: ["Two Pointers", "Fast & Slow", "Fixed vs Variable Window"],
    problemCount: 12,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.7",
    prerequisites: ["Arrays", "Strings"],
    platformResources: {
      visualizer: "Two-pointer sweep animation, sliding window expand/shrink visual",
      problemArena: ["Three Sum", "Longest Substring Without Repeating Characters"]
    }
  },
];

export const systemDesignRoadmap: RoadmapNode[] = [
  {
    id: "networking",
    title: "Networking Basics",
    description: "HTTP, TCP/IP, DNS, and how the internet works.",
    difficulty: "beginner",
    category: "system-design",
    icon: "🌐",
    topics: ["HTTP/HTTPS", "TCP/IP", "DNS", "WebSockets"],
    problemCount: 3,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.1",
  },
  {
    id: "api-design",
    title: "API Design",
    description: "RESTful APIs, GraphQL, and API best practices.",
    difficulty: "beginner",
    category: "system-design",
    icon: "🔌",
    topics: ["REST", "GraphQL", "Rate limiting", "Versioning"],
    problemCount: 3,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.2",
  },
  {
    id: "databases",
    title: "Databases",
    description: "SQL vs NoSQL, indexing, normalization, and query optimization.",
    difficulty: "intermediate",
    category: "system-design",
    icon: "💾",
    topics: ["SQL vs NoSQL", "Indexing", "ACID", "Normalization"],
    problemCount: 4,
    phase: "Phase 1",
    phaseId: 1,
    section: "1.3",
  },
  {
    id: "caching",
    title: "Caching",
    description: "Cache strategies, Redis, CDN, and cache invalidation.",
    difficulty: "intermediate",
    category: "system-design",
    icon: "⚡",
    topics: ["Redis", "Cache strategies", "CDN", "Cache invalidation"],
    problemCount: 3,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.1",
  },
  {
    id: "load-balancers",
    title: "Load Balancers",
    description: "Distribute traffic efficiently across servers.",
    difficulty: "intermediate",
    category: "system-design",
    icon: "⚖️",
    topics: ["Round robin", "Least connections", "Health checks", "L4 vs L7"],
    problemCount: 2,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.2",
  },
  {
    id: "message-queues",
    title: "Message Queues",
    description: "Asynchronous communication between services with Kafka, RabbitMQ, and SQS.",
    difficulty: "intermediate",
    category: "system-design",
    icon: "📨",
    topics: ["Pub/Sub", "Kafka", "RabbitMQ", "Dead letter queues"],
    problemCount: 3,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.3",
  },
  {
    id: "proxies",
    title: "Proxies & Reverse Proxies",
    description: "Forward proxies, reverse proxies, and API gateways.",
    difficulty: "intermediate",
    category: "system-design",
    icon: "🛡️",
    topics: ["Forward proxy", "Reverse proxy", "Nginx", "API Gateway"],
    problemCount: 2,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.4",
  },
  {
    id: "storage",
    title: "Storage & File Systems",
    description: "Object storage, block storage, and distributed file systems.",
    difficulty: "intermediate",
    category: "system-design",
    icon: "📦",
    topics: ["Object storage (S3)", "Block storage", "HDFS", "Data lakes"],
    problemCount: 3,
    phase: "Phase 2",
    phaseId: 2,
    section: "2.5",
  },
  {
    id: "microservices",
    title: "Microservices",
    description: "Service-oriented architecture, containerization, and orchestration.",
    difficulty: "advanced",
    category: "system-design",
    icon: "🧱",
    topics: ["Monolith vs Microservices", "Docker", "Kubernetes", "Service mesh"],
    problemCount: 3,
    phase: "Phase 3",
    phaseId: 3,
    section: "3.1",
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    description: "CAP theorem, consistency, partitioning, and replication.",
    difficulty: "advanced",
    category: "system-design",
    icon: "🏗️",
    topics: ["CAP theorem", "Consistency", "Sharding", "Replication"],
    problemCount: 4,
    phase: "Phase 3",
    phaseId: 3,
    section: "3.2",
  },
  {
    id: "security-auth",
    title: "Security & Authentication",
    description: "OAuth, JWT, encryption, and secure system design.",
    difficulty: "advanced",
    category: "system-design",
    icon: "🔐",
    topics: ["OAuth 2.0", "JWT", "TLS/SSL", "RBAC"],
    problemCount: 3,
    phase: "Phase 3",
    phaseId: 3,
    section: "3.3",
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    description: "Real-world system design case studies and common patterns.",
    difficulty: "advanced",
    category: "system-design",
    icon: "🎯",
    topics: ["URL shortener", "Chat system", "News feed", "Rate limiter"],
    problemCount: 4,
    phase: "Phase 4",
    phaseId: 4,
    section: "4.1",
  },
];
 
  
