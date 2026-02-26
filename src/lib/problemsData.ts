export interface Problem {
  id: string;
  topicId: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>;
  testCases: { input: string; expected: string }[];
}

export const problems: Problem[] = [
  // ===== ARRAYS (4) =====
  {
    id: "two-sum",
    topicId: "arrays",
    title: "Two Sum",
    difficulty: "easy",
    description: "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1, 2]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Your code here\n  \n}`,
      python: `def two_sum(nums, target):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
  },
  {
    id: "max-subarray",
    topicId: "arrays",
    title: "Maximum Subarray",
    difficulty: "medium",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // Your code here\n  \n}`,
      python: `def max_sub_array(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { input: "[1]", expected: "1" },
      { input: "[5,4,-1,7,8]", expected: "23" },
    ],
  },
  {
    id: "product-except-self",
    topicId: "arrays",
    title: "Product of Array Except Self",
    difficulty: "medium",
    description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must solve it without using division and in O(n) time.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "Product of any prefix/suffix fits in a 32-bit integer."],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n  // Your code here\n  \n}`,
      python: `def product_except_self(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3,4]", expected: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", expected: "[0,0,9,0,0]" },
    ],
  },
  {
    id: "merge-sorted-arrays",
    topicId: "arrays",
    title: "Merge Sorted Array",
    difficulty: "easy",
    description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums2` into `nums1` as one sorted array. The final sorted array should be stored inside `nums1`.",
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
    ],
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 <= m, n <= 200"],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {\n  // Modify nums1 in-place\n  \n}`,
      python: `def merge(nums1, m, nums2, n):\n    # Modify nums1 in-place\n    pass`,
      java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Your code here\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3,0,0,0], 3, [2,5,6], 3", expected: "[1,2,2,3,5,6]" },
      { input: "[1], 1, [], 0", expected: "[1]" },
    ],
  },

  // ===== STRINGS (3) =====
  {
    id: "reverse-string",
    topicId: "strings",
    title: "Reverse String",
    difficulty: "easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ASCII character."],
    starterCode: {
      javascript: `function reverseString(s) {\n  // Modify s in-place\n  \n}`,
      python: `def reverse_string(s):\n    # Modify s in-place\n    pass`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        // Modify s in-place\n    }\n}`,
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
    ],
  },
  {
    id: "valid-anagram",
    topicId: "strings",
    title: "Valid Anagram",
    difficulty: "easy",
    description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  // Your code here\n  \n}`,
      python: `def is_anagram(s, t):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: '"anagram", "nagaram"', expected: "true" },
      { input: '"rat", "car"', expected: "false" },
    ],
  },
  {
    id: "longest-common-prefix",
    topicId: "strings",
    title: "Longest Common Prefix",
    difficulty: "easy",
    description: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string.",
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""' },
    ],
    constraints: ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] consists of only lowercase English letters."],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {\n  // Your code here\n  \n}`,
      python: `def longest_common_prefix(strs):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // Your code here\n        return "";\n    }\n}`,
    },
    testCases: [
      { input: '["flower","flow","flight"]', expected: '"fl"' },
      { input: '["dog","racecar","car"]', expected: '""' },
    ],
  },

  // ===== HASHMAPS (3) =====
  {
    id: "contains-duplicate",
    topicId: "hashmaps",
    title: "Contains Duplicate",
    difficulty: "easy",
    description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n  // Your code here\n  \n}`,
      python: `def contains_duplicate(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3,1]", expected: "true" },
      { input: "[1,2,3,4]", expected: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expected: "true" },
    ],
  },
  {
    id: "group-anagrams",
    topicId: "hashmaps",
    title: "Group Anagrams",
    difficulty: "medium",
    description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n  // Your code here\n  \n}`,
      python: `def group_anagrams(strs):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    },
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: '[""]', expected: '[[""]]' },
    ],
  },
  {
    id: "top-k-frequent",
    topicId: "hashmaps",
    title: "Top K Frequent Elements",
    difficulty: "medium",
    description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in range [1, number of unique elements]."],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n  // Your code here\n  \n}`,
      python: `def top_k_frequent(nums, k):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    },
    testCases: [
      { input: "[1,1,1,2,2,3], 2", expected: "[1,2]" },
      { input: "[1], 1", expected: "[1]" },
    ],
  },

  // ===== LINKED LISTS (3) =====
  {
    id: "reverse-linked-list",
    topicId: "linked-lists",
    title: "Reverse Linked List",
    difficulty: "easy",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: ["The number of nodes is in range [0, 5000].", "-5000 <= Node.val <= 5000"],
    starterCode: {
      javascript: `function reverseList(head) {\n  // head is { val, next } or null\n  \n}`,
      python: `def reverse_list(head):\n    # head is ListNode(val, next) or None\n    pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" },
      { input: "[1,2]", expected: "[2,1]" },
    ],
  },
  {
    id: "linked-list-cycle",
    topicId: "linked-lists",
    title: "Linked List Cycle",
    difficulty: "easy",
    description: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nA cycle exists if some node can be reached again by continuously following the `next` pointer.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "There is a cycle where tail connects to index 1." },
      { input: "head = [1], pos = -1", output: "false" },
    ],
    constraints: ["The number of nodes is in range [0, 10^4].", "-10^5 <= Node.val <= 10^5"],
    starterCode: {
      javascript: `function hasCycle(head) {\n  // Use Floyd's cycle detection\n  \n}`,
      python: `def has_cycle(head):\n    # Use Floyd's cycle detection\n    pass`,
      java: `class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: "[3,2,0,-4], pos=1", expected: "true" },
      { input: "[1], pos=-1", expected: "false" },
    ],
  },
  {
    id: "merge-two-sorted-lists",
    topicId: "linked-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    description: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list by splicing together the nodes. Return the head of the merged linked list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in both lists is in range [0, 50].", "-100 <= Node.val <= 100", "Both lists are sorted in non-decreasing order."],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {\n  // Your code here\n  \n}`,
      python: `def merge_two_lists(list1, list2):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Your code here\n        return null;\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,4], [1,3,4]", expected: "[1,1,2,3,4,4]" },
      { input: "[], [0]", expected: "[0]" },
    ],
  },

  // ===== TWO POINTERS (3) =====
  {
    id: "valid-palindrome",
    topicId: "two-pointers",
    title: "Valid Palindrome",
    difficulty: "easy",
    description: "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    starterCode: {
      javascript: `function isPalindrome(s) {\n  // Your code here\n  \n}`,
      python: `def is_palindrome(s):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: "true" },
      { input: '"race a car"', expected: "false" },
      { input: '" "', expected: "true" },
    ],
  },
  {
    id: "three-sum",
    topicId: "two-pointers",
    title: "3Sum",
    difficulty: "medium",
    description: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nThe solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function threeSum(nums) {\n  // Your code here\n  \n}`,
      python: `def three_sum(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    },
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[0,1,1]", expected: "[]" },
      { input: "[0,0,0]", expected: "[[0,0,0]]" },
    ],
  },
  {
    id: "container-with-most-water",
    topicId: "two-pointers",
    title: "Container With Most Water",
    difficulty: "medium",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      javascript: `function maxArea(height) {\n  // Your code here\n  \n}`,
      python: `def max_area(height):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { input: "[1,1]", expected: "1" },
    ],
  },

  // ===== SLIDING WINDOW (3) =====
  {
    id: "best-time-to-buy-sell-stock",
    topicId: "sliding-window",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit. If no profit is possible, return 0.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: `function maxProfit(prices) {\n  // Your code here\n  \n}`,
      python: `def max_profit(prices):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[7,1,5,3,6,4]", expected: "5" },
      { input: "[7,6,4,3,1]", expected: "0" },
    ],
  },
  {
    id: "longest-substring-no-repeat",
    topicId: "sliding-window",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: "1" },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  // Your code here\n  \n}`,
      python: `def length_of_longest_substring(s):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: '"abcabcbb"', expected: "3" },
      { input: '"bbbbb"', expected: "1" },
      { input: '"pwwkew"', expected: "3" },
    ],
  },
  {
    id: "min-window-substring",
    topicId: "sliding-window",
    title: "Minimum Window Substring",
    difficulty: "hard",
    description: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.\n\nIf there is no such substring, return the empty string.",
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
    ],
    constraints: ["1 <= s.length, t.length <= 10^5", "s and t consist of uppercase and lowercase English letters."],
    starterCode: {
      javascript: `function minWindow(s, t) {\n  // Your code here\n  \n}`,
      python: `def min_window(s, t):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public String minWindow(String s, String t) {\n        // Your code here\n        return "";\n    }\n}`,
    },
    testCases: [
      { input: '"ADOBECODEBANC", "ABC"', expected: '"BANC"' },
      { input: '"a", "a"', expected: '"a"' },
      { input: '"a", "aa"', expected: '""' },
    ],
  },

  // ===== SORTING (2) =====
  {
    id: "merge-intervals",
    topicId: "sorting",
    title: "Merge Intervals",
    difficulty: "medium",
    description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= start_i <= end_i <= 10^4"],
    starterCode: {
      javascript: `function merge(intervals) {\n  // Your code here\n  \n}`,
      python: `def merge(intervals):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        // Your code here\n        return new int[][]{};\n    }\n}`,
    },
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" },
      { input: "[[1,4],[4,5]]", expected: "[[1,5]]" },
    ],
  },
  {
    id: "sort-colors",
    topicId: "sorting",
    title: "Sort Colors",
    difficulty: "medium",
    description: "Given an array `nums` with `n` objects colored red, white, or blue (represented as 0, 1, and 2), sort them in-place so that objects of the same color are adjacent.\n\nYou must solve this without using the library's sort function.",
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
      { input: "nums = [2,0,1]", output: "[0,1,2]" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 300", "nums[i] is 0, 1, or 2."],
    starterCode: {
      javascript: `function sortColors(nums) {\n  // Modify nums in-place (Dutch National Flag)\n  \n}`,
      python: `def sort_colors(nums):\n    # Modify nums in-place\n    pass`,
      java: `class Solution {\n    public void sortColors(int[] nums) {\n        // Your code here\n    }\n}`,
    },
    testCases: [
      { input: "[2,0,2,1,1,0]", expected: "[0,0,1,1,2,2]" },
      { input: "[2,0,1]", expected: "[0,1,2]" },
    ],
  },

  // ===== BINARY SEARCH (3) =====
  {
    id: "binary-search-basic",
    topicId: "binary-search",
    title: "Binary Search",
    difficulty: "easy",
    description: "Given an array of integers `nums` sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "All elements are unique.", "nums is sorted in ascending order."],
    starterCode: {
      javascript: `function search(nums, target) {\n  // Your code here\n  \n}`,
      python: `def search(nums, target):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}`,
    },
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expected: "4" },
      { input: "[-1,0,3,5,9,12], 2", expected: "-1" },
    ],
  },
  {
    id: "search-rotated-sorted-array",
    topicId: "binary-search",
    title: "Search in Rotated Sorted Array",
    difficulty: "medium",
    description: "You are given an integer array `nums` sorted in ascending order (with distinct values), which is possibly rotated at an unknown pivot.\n\nGiven the array after rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values are distinct."],
    starterCode: {
      javascript: `function search(nums, target) {\n  // Your code here\n  \n}`,
      python: `def search(nums, target):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}`,
    },
    testCases: [
      { input: "[4,5,6,7,0,1,2], 0", expected: "4" },
      { input: "[4,5,6,7,0,1,2], 3", expected: "-1" },
      { input: "[1], 0", expected: "-1" },
    ],
  },
  {
    id: "find-min-rotated",
    topicId: "binary-search",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "medium",
    description: "Given a sorted rotated array of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 5000", "All integers are unique."],
    starterCode: {
      javascript: `function findMin(nums) {\n  // Your code here\n  \n}`,
      python: `def find_min(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[3,4,5,1,2]", expected: "1" },
      { input: "[4,5,6,7,0,1,2]", expected: "0" },
      { input: "[11,13,15,17]", expected: "11" },
    ],
  },

  // ===== STACKS (2) =====
  {
    id: "valid-parentheses",
    topicId: "stacks",
    title: "Valid Parentheses",
    difficulty: "easy",
    description: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    starterCode: {
      javascript: `function isValid(s) {\n  // Your code here\n  \n}`,
      python: `def is_valid(s):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" },
      { input: '"([)]"', expected: "false" },
    ],
  },
  {
    id: "min-stack",
    topicId: "stacks",
    title: "Min Stack",
    difficulty: "medium",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class with `push(val)`, `pop()`, `top()`, and `getMin()` methods.",
    examples: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: "[null,null,null,null,-3,null,0,-2]" },
    ],
    constraints: ["-2^31 <= val <= 2^31 - 1", "Methods pop, top and getMin will always be called on non-empty stacks.", "At most 3 * 10^4 calls will be made."],
    starterCode: {
      javascript: `class MinStack {\n  constructor() {\n    // Your code here\n  }\n  push(val) { }\n  pop() { }\n  top() { }\n  getMin() { }\n}`,
      python: `class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val):\n        pass\n    def pop(self):\n        pass\n    def top(self):\n        pass\n    def get_min(self):\n        pass`,
      java: `class MinStack {\n    public MinStack() { }\n    public void push(int val) { }\n    public void pop() { }\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}`,
    },
    testCases: [
      { input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", expected: "-3, 0, -2" },
    ],
  },

  // ===== QUEUES (2) =====
  {
    id: "implement-queue-using-stacks",
    topicId: "queues",
    title: "Implement Queue using Stacks",
    difficulty: "easy",
    description: "Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support `push`, `peek`, `pop`, and `empty`.",
    examples: [
      { input: '["MyQueue","push","push","peek","pop","empty"]\n[[],[1],[2],[],[],[]]', output: "[null,null,null,1,1,false]" },
    ],
    constraints: ["1 <= x <= 9", "At most 100 calls will be made to push, pop, peek, and empty.", "All calls to pop and peek are valid."],
    starterCode: {
      javascript: `class MyQueue {\n  constructor() {\n    // Your code here\n  }\n  push(x) { }\n  pop() { }\n  peek() { }\n  empty() { }\n}`,
      python: `class MyQueue:\n    def __init__(self):\n        pass\n    def push(self, x):\n        pass\n    def pop(self):\n        pass\n    def peek(self):\n        pass\n    def empty(self):\n        pass`,
      java: `class MyQueue {\n    public MyQueue() { }\n    public void push(int x) { }\n    public int pop() { return 0; }\n    public int peek() { return 0; }\n    public boolean empty() { return true; }\n}`,
    },
    testCases: [
      { input: "push(1), push(2), peek(), pop(), empty()", expected: "1, 1, false" },
    ],
  },
  {
    id: "number-of-recent-calls",
    topicId: "queues",
    title: "Number of Recent Calls",
    difficulty: "easy",
    description: "You have a `RecentCounter` class which counts the number of recent requests within a certain time frame.\n\nImplement `ping(t)` which adds a new request at time `t` and returns the number of requests that have happened in the inclusive range `[t - 3000, t]`.",
    examples: [
      { input: '["RecentCounter","ping","ping","ping","ping"]\n[[],[1],[100],[3001],[3002]]', output: "[null,1,2,3,3]" },
    ],
    constraints: ["1 <= t <= 10^9", "Each test case will call ping with strictly increasing values of t.", "At most 10^4 calls will be made to ping."],
    starterCode: {
      javascript: `class RecentCounter {\n  constructor() {\n    // Your code here\n  }\n  ping(t) {\n    // Your code here\n  }\n}`,
      python: `class RecentCounter:\n    def __init__(self):\n        pass\n    def ping(self, t):\n        pass`,
      java: `class RecentCounter {\n    public RecentCounter() { }\n    public int ping(int t) { return 0; }\n}`,
    },
    testCases: [
      { input: "ping(1), ping(100), ping(3001), ping(3002)", expected: "1, 2, 3, 3" },
    ],
  },

  // ===== RECURSION & BACKTRACKING (3) =====
  {
    id: "subsets",
    topicId: "recursion",
    title: "Subsets",
    difficulty: "medium",
    description: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" },
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All elements are unique."],
    starterCode: {
      javascript: `function subsets(nums) {\n  // Your code here\n  \n}`,
      python: `def subsets(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3]", expected: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "[0]", expected: "[[],[0]]" },
    ],
  },
  {
    id: "permutations",
    topicId: "recursion",
    title: "Permutations",
    difficulty: "medium",
    description: "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
    ],
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All integers are unique."],
    starterCode: {
      javascript: `function permute(nums) {\n  // Your code here\n  \n}`,
      python: `def permute(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3]", expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "[0,1]", expected: "[[0,1],[1,0]]" },
    ],
  },
  {
    id: "combination-sum",
    topicId: "recursion",
    title: "Combination Sum",
    difficulty: "medium",
    description: "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`.\n\nThe same number may be chosen an unlimited number of times.",
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    ],
    constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40", "All elements are distinct.", "1 <= target <= 40"],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {\n  // Your code here\n  \n}`,
      python: `def combination_sum(candidates, target):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    },
    testCases: [
      { input: "[2,3,6,7], 7", expected: "[[2,2,3],[7]]" },
      { input: "[2,3,5], 8", expected: "[[2,2,2,2],[2,3,3],[3,5]]" },
    ],
  },

  // ===== TREES (3) =====
  {
    id: "max-depth-binary-tree",
    topicId: "trees",
    title: "Maximum Depth of Binary Tree",
    difficulty: "easy",
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["The number of nodes is in range [0, 10^4].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function maxDepth(root) {\n  // root is { val, left, right } or null\n  \n}`,
      python: `def max_depth(root):\n    # root is TreeNode(val, left, right) or None\n    pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected: "3" },
      { input: "[1,null,2]", expected: "2" },
    ],
  },
  {
    id: "invert-binary-tree",
    topicId: "trees",
    title: "Invert Binary Tree",
    difficulty: "easy",
    description: "Given the `root` of a binary tree, invert the tree, and return its root.\n\nInverting a binary tree means swapping the left and right children of every node.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    constraints: ["The number of nodes is in range [0, 100].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function invertTree(root) {\n  // Your code here\n  \n}`,
      python: `def invert_tree(root):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Your code here\n        return null;\n    }\n}`,
    },
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", expected: "[2,3,1]" },
    ],
  },
  {
    id: "validate-bst",
    topicId: "trees",
    title: "Validate Binary Search Tree",
    difficulty: "medium",
    description: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "The root's right child is 4 which is less than root 5." },
    ],
    constraints: ["The number of nodes is in range [1, 10^4].", "-2^31 <= Node.val <= 2^31 - 1"],
    starterCode: {
      javascript: `function isValidBST(root) {\n  // Your code here\n  \n}`,
      python: `def is_valid_bst(root):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: "[2,1,3]", expected: "true" },
      { input: "[5,1,4,null,null,3,6]", expected: "false" },
    ],
  },

  // ===== HEAPS (2) =====
  {
    id: "kth-largest-element",
    topicId: "heaps",
    title: "Kth Largest Element in an Array",
    difficulty: "medium",
    description: "Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.\n\nNote that it is the `k`th largest element in sorted order, not the `k`th distinct element.",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function findKthLargest(nums, k) {\n  // Your code here\n  \n}`,
      python: `def find_kth_largest(nums, k):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[3,2,1,5,6,4], 2", expected: "5" },
      { input: "[3,2,3,1,2,4,5,5,6], 4", expected: "4" },
    ],
  },
  {
    id: "last-stone-weight",
    topicId: "heaps",
    title: "Last Stone Weight",
    difficulty: "easy",
    description: "You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone.\n\nOn each turn, choose the two heaviest stones and smash them together. If they have the same weight, both are destroyed. If they differ, the lighter one is destroyed and the heavier one's weight is reduced by the lighter one's weight.\n\nReturn the weight of the last remaining stone, or 0 if none remain.",
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" },
      { input: "stones = [1]", output: "1" },
    ],
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
    starterCode: {
      javascript: `function lastStoneWeight(stones) {\n  // Your code here\n  \n}`,
      python: `def last_stone_weight(stones):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int lastStoneWeight(int[] stones) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[2,7,4,1,8,1]", expected: "1" },
      { input: "[1]", expected: "1" },
    ],
  },

  // ===== TRIES (2) =====
  {
    id: "implement-trie",
    topicId: "tries",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "medium",
    description: "Implement a trie with `insert`, `search`, and `startsWith` methods.\n\n- `insert(word)` inserts the string `word` into the trie.\n- `search(word)` returns `true` if the string `word` is in the trie.\n- `startsWith(prefix)` returns `true` if any previously inserted string has the prefix `prefix`.",
    examples: [
      { input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', output: "[null,null,true,false,true,null,true]" },
    ],
    constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters.", "At most 3 * 10^4 calls in total."],
    starterCode: {
      javascript: `class Trie {\n  constructor() {\n    // Your code here\n  }\n  insert(word) { }\n  search(word) { }\n  startsWith(prefix) { }\n}`,
      python: `class Trie:\n    def __init__(self):\n        pass\n    def insert(self, word):\n        pass\n    def search(self, word):\n        pass\n    def starts_with(self, prefix):\n        pass`,
      java: `class Trie {\n    public Trie() { }\n    public void insert(String word) { }\n    public boolean search(String word) { return false; }\n    public boolean startsWith(String prefix) { return false; }\n}`,
    },
    testCases: [
      { input: 'insert("apple"), search("apple"), search("app"), startsWith("app")', expected: "true, false, true" },
    ],
  },
  {
    id: "word-search-ii",
    topicId: "tries",
    title: "Word Search II",
    difficulty: "hard",
    description: "Given an `m x n` board of characters and a list of strings `words`, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells (horizontally or vertically). The same cell may not be used more than once in a word.",
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 12", "1 <= words.length <= 3 * 10^4"],
    starterCode: {
      javascript: `function findWords(board, words) {\n  // Your code here\n  \n}`,
      python: `def find_words(board, words):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    },
    testCases: [
      { input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]', expected: '["eat","oath"]' },
    ],
  },

  // ===== GRAPHS (3) =====
  {
    id: "number-of-islands",
    topicId: "graphs",
    title: "Number of Islands",
    difficulty: "medium",
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    starterCode: {
      javascript: `function numIslands(grid) {\n  // Your code here\n  \n}`,
      python: `def num_islands(grid):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: "1" },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: "3" },
    ],
  },
  {
    id: "clone-graph",
    topicId: "graphs",
    title: "Clone Graph",
    difficulty: "medium",
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node contains a value and a list of its neighbors.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
      { input: "adjList = [[]]", output: "[[]]" },
    ],
    constraints: ["The number of nodes is in range [0, 100].", "1 <= Node.val <= 100", "There are no repeated edges and no self-loops."],
    starterCode: {
      javascript: `function cloneGraph(node) {\n  // node is { val, neighbors } or null\n  \n}`,
      python: `def clone_graph(node):\n    # node is Node(val, neighbors) or None\n    pass`,
      java: `class Solution {\n    public Node cloneGraph(Node node) {\n        // Your code here\n        return null;\n    }\n}`,
    },
    testCases: [
      { input: "[[2,4],[1,3],[2,4],[1,3]]", expected: "[[2,4],[1,3],[2,4],[1,3]]" },
    ],
  },
  {
    id: "course-schedule",
    topicId: "graphs",
    title: "Course Schedule",
    difficulty: "medium",
    description: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates you must take course `b_i` before course `a_i`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  // Your code here\n  \n}`,
      python: `def can_finish(num_courses, prerequisites):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: "2, [[1,0]]", expected: "true" },
      { input: "2, [[1,0],[0,1]]", expected: "false" },
    ],
  },

  // ===== UNION-FIND (2) =====
  {
    id: "number-of-provinces",
    topicId: "union-find",
    title: "Number of Provinces",
    difficulty: "medium",
    description: "There are `n` cities. Some of them are connected and some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.\n\nA province is a group of directly or indirectly connected cities. Given an `n x n` adjacency matrix `isConnected`, return the total number of provinces.",
    examples: [
      { input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]", output: "2" },
      { input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]", output: "3" },
    ],
    constraints: ["1 <= n <= 200", "isConnected[i][j] is 1 or 0.", "isConnected[i][i] == 1", "isConnected[i][j] == isConnected[j][i]"],
    starterCode: {
      javascript: `function findCircleNum(isConnected) {\n  // Your code here\n  \n}`,
      python: `def find_circle_num(is_connected):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int findCircleNum(int[][] isConnected) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[[1,1,0],[1,1,0],[0,0,1]]", expected: "2" },
      { input: "[[1,0,0],[0,1,0],[0,0,1]]", expected: "3" },
    ],
  },
  {
    id: "redundant-connection",
    topicId: "union-find",
    title: "Redundant Connection",
    difficulty: "medium",
    description: "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with `n` nodes. One additional edge was added. Return the edge that can be removed so the resulting graph is a tree.",
    examples: [
      { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]" },
      { input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]", output: "[1,4]" },
    ],
    constraints: ["n == edges.length", "3 <= n <= 1000", "There are no repeated edges.", "The given graph is connected."],
    starterCode: {
      javascript: `function findRedundantConnection(edges) {\n  // Your code here\n  \n}`,
      python: `def find_redundant_connection(edges):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    },
    testCases: [
      { input: "[[1,2],[1,3],[2,3]]", expected: "[2,3]" },
      { input: "[[1,2],[2,3],[3,4],[1,4],[1,5]]", expected: "[1,4]" },
    ],
  },

  // ===== GREEDY (3) =====
  {
    id: "jump-game",
    topicId: "greedy",
    title: "Jump Game",
    difficulty: "medium",
    description: "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
      { input: "nums = [3,2,1,0,4]", output: "false" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function canJump(nums) {\n  // Your code here\n  \n}`,
      python: `def can_jump(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public boolean canJump(int[] nums) {\n        // Your code here\n        return false;\n    }\n}`,
    },
    testCases: [
      { input: "[2,3,1,1,4]", expected: "true" },
      { input: "[3,2,1,0,4]", expected: "false" },
    ],
  },
  {
    id: "assign-cookies",
    topicId: "greedy",
    title: "Assign Cookies",
    difficulty: "easy",
    description: "You are an awesome parent who wants to give your children some cookies. Each child `i` has a greed factor `g[i]`, and each cookie `j` has size `s[j]`.\n\nChild `i` will be content if `s[j] >= g[i]`. Maximize the number of content children and output the maximum number.",
    examples: [
      { input: "g = [1,2,3], s = [1,1]", output: "1" },
      { input: "g = [1,2], s = [1,2,3]", output: "2" },
    ],
    constraints: ["1 <= g.length <= 3 * 10^4", "0 <= s.length <= 3 * 10^4", "1 <= g[i], s[j] <= 2^31 - 1"],
    starterCode: {
      javascript: `function findContentChildren(g, s) {\n  // Your code here\n  \n}`,
      python: `def find_content_children(g, s):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int findContentChildren(int[] g, int[] s) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3], [1,1]", expected: "1" },
      { input: "[1,2], [1,2,3]", expected: "2" },
    ],
  },
  {
    id: "gas-station",
    topicId: "greedy",
    title: "Gas Station",
    difficulty: "medium",
    description: "There are `n` gas stations along a circular route. You are given two integer arrays `gas` and `cost` where `gas[i]` is the amount of gas at station `i`, and `cost[i]` is the gas cost to travel from station `i` to station `i + 1`.\n\nReturn the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`.",
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
    ],
    constraints: ["n == gas.length == cost.length", "1 <= n <= 10^5", "0 <= gas[i], cost[i] <= 10^4"],
    starterCode: {
      javascript: `function canCompleteCircuit(gas, cost) {\n  // Your code here\n  \n}`,
      python: `def can_complete_circuit(gas, cost):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        // Your code here\n        return -1;\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3,4,5], [3,4,5,1,2]", expected: "3" },
      { input: "[2,3,4], [3,4,3]", expected: "-1" },
    ],
  },

  // ===== DYNAMIC PROGRAMMING (4) =====
  {
    id: "climbing-stairs",
    topicId: "dynamic-programming",
    title: "Climbing Stairs",
    difficulty: "easy",
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
      { input: "n = 3", output: "3" },
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: `function climbStairs(n) {\n  // Your code here\n  \n}`,
      python: `def climb_stairs(n):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "2", expected: "2" },
      { input: "3", expected: "3" },
      { input: "5", expected: "8" },
    ],
  },
  {
    id: "coin-change",
    topicId: "dynamic-programming",
    title: "Coin Change",
    difficulty: "medium",
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins needed to make up that amount. If it cannot be made up, return `-1`.",
    examples: [
      { input: "coins = [1,5,10], amount = 12", output: "3", explanation: "12 = 10 + 1 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  // Your code here\n  \n}`,
      python: `def coin_change(coins, amount):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Your code here\n        return -1;\n    }\n}`,
    },
    testCases: [
      { input: "[1,5,10], 12", expected: "3" },
      { input: "[2], 3", expected: "-1" },
      { input: "[1], 0", expected: "0" },
    ],
  },
  {
    id: "longest-increasing-subsequence",
    topicId: "dynamic-programming",
    title: "Longest Increasing Subsequence",
    difficulty: "medium",
    description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The LIS is [2,3,7,101], length 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n  // Your code here\n  \n}`,
      python: `def length_of_lis(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expected: "4" },
      { input: "[0,1,0,3,2,3]", expected: "4" },
      { input: "[7,7,7,7,7]", expected: "1" },
    ],
  },
  {
    id: "house-robber",
    topicId: "dynamic-programming",
    title: "House Robber",
    difficulty: "medium",
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected — if two adjacent houses are broken into on the same night, the police will be alerted.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4." },
      { input: "nums = [2,7,9,3,1]", output: "12" },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    starterCode: {
      javascript: `function rob(nums) {\n  // Your code here\n  \n}`,
      python: `def rob(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[1,2,3,1]", expected: "4" },
      { input: "[2,7,9,3,1]", expected: "12" },
    ],
  },

  // ===== BIT MANIPULATION (3) =====
  {
    id: "single-number",
    topicId: "bit-manipulation",
    title: "Single Number",
    difficulty: "easy",
    description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with linear runtime and constant extra space.",
    examples: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4", "Each element appears twice except for one."],
    starterCode: {
      javascript: `function singleNumber(nums) {\n  // Your code here\n  \n}`,
      python: `def single_number(nums):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "[2,2,1]", expected: "1" },
      { input: "[4,1,2,1,2]", expected: "4" },
    ],
  },
  {
    id: "counting-bits",
    topicId: "bit-manipulation",
    title: "Counting Bits",
    difficulty: "easy",
    description: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",
    examples: [
      { input: "n = 2", output: "[0,1,1]" },
      { input: "n = 5", output: "[0,1,1,2,1,2]" },
    ],
    constraints: ["0 <= n <= 10^5"],
    starterCode: {
      javascript: `function countBits(n) {\n  // Your code here\n  \n}`,
      python: `def count_bits(n):\n    # Your code here\n    pass`,
      java: `class Solution {\n    public int[] countBits(int n) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    },
    testCases: [
      { input: "2", expected: "[0,1,1]" },
      { input: "5", expected: "[0,1,1,2,1,2]" },
    ],
  },
  {
    id: "reverse-bits",
    topicId: "bit-manipulation",
    title: "Reverse Bits",
    difficulty: "easy",
    description: "Reverse bits of a given 32-bit unsigned integer.\n\nFor example, the input `43261596` (binary: `00000010100101000001111010011100`) becomes `964176192` (binary: `00111001011110000010100101000000`).",
    examples: [
      { input: "n = 43261596", output: "964176192" },
      { input: "n = 4294967293", output: "3221225471" },
    ],
    constraints: ["The input must be a 32-bit unsigned integer."],
    starterCode: {
      javascript: `function reverseBits(n) {\n  // Your code here\n  \n}`,
      python: `def reverse_bits(n):\n    # Your code here\n    pass`,
      java: `public class Solution {\n    public int reverseBits(int n) {\n        // Your code here\n        return 0;\n    }\n}`,
    },
    testCases: [
      { input: "43261596", expected: "964176192" },
      { input: "4294967293", expected: "3221225471" },
    ],
  },
];

export const getProblemsByTopic = (topicId: string) =>
  problems.filter((p) => p.topicId === topicId);

export const getProblemById = (id: string) =>
  problems.find((p) => p.id === id);
