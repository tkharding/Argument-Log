import { useState, useEffect } from "react";

const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
const TOPICS = ["Money","Parenting","Chores","Work","In-Laws","Intimacy","Communication","Religion","Politics"];
const INTENSITIES = [
  { label:"Mild",     color:"#2a7ab5", desc:"Minor friction" },
  { label:"Moderate", color:"#2e8b57", desc:"Raised voices"  },
  { label:"Severe",   color:"#c0392b", desc:"Major conflict"  },
];

const SAMPLE = {
  "2021-01-01": [
    { id:200, topic:"Work", intensity:0, note:"Stress brought home." },
    { id:201, topic:"Politics", intensity:0, note:"Political post argument." },
  ],
  "2021-01-24": [{ id:202, topic:"Money", intensity:0, note:"Budget disagreement." }],
  "2021-02-07": [
    { id:205, topic:"Intimacy", intensity:0, note:"Need more quality time." },
    { id:206, topic:"Intimacy", intensity:0, note:"Feeling unappreciated." },
  ],
  "2021-02-18": [
    { id:203, topic:"Work", intensity:1, note:"Work call during dinner." },
    { id:204, topic:"Money", intensity:1, note:"Budget disagreement." },
  ],
  "2021-03-12": [
    { id:207, topic:"Money", intensity:1, note:"Unexpected bill." },
    { id:208, topic:"Parenting", intensity:2, note:"Bedtime routine." },
  ],
  "2021-03-20": [{ id:209, topic:"Politics", intensity:0, note:"Policy disagreement." }],
  "2021-04-03": [{ id:214, topic:"Politics", intensity:1, note:"Differing views at dinner." }],
  "2021-04-07": [{ id:211, topic:"Parenting", intensity:0, note:"Bedtime routine." }],
  "2021-04-19": [{ id:210, topic:"Work", intensity:1, note:"Stress brought home." }],
  "2021-04-23": [
    { id:212, topic:"Chores", intensity:0, note:"Laundry piling up." },
    { id:213, topic:"In-Laws", intensity:1, note:"Holiday visit conflict." },
  ],
  "2021-05-09": [{ id:216, topic:"Money", intensity:2, note:"Savings argument." }],
  "2021-05-13": [{ id:215, topic:"Intimacy", intensity:2, note:"Feeling disconnected." }],
  "2021-05-18": [
    { id:221, topic:"Communication", intensity:2, note:"Not listening." },
    { id:222, topic:"Intimacy", intensity:0, note:"Need more quality time." },
  ],
  "2021-05-21": [
    { id:217, topic:"Parenting", intensity:0, note:"Summer camp plans." },
    { id:218, topic:"Intimacy", intensity:0, note:"Feeling unappreciated." },
  ],
  "2021-05-23": [
    { id:219, topic:"Religion", intensity:0, note:"Holiday traditions clash." },
    { id:220, topic:"Work", intensity:1, note:"Job stress tension." },
  ],
  "2021-06-02": [
    { id:226, topic:"Intimacy", intensity:0, note:"Feeling unappreciated." },
    { id:227, topic:"Chores", intensity:1, note:"Yard work ignored." },
  ],
  "2021-06-03": [{ id:223, topic:"Communication", intensity:1, note:"Not listening." }],
  "2021-06-04": [{ id:228, topic:"Politics", intensity:2, note:"News argument." }],
  "2021-06-05": [{ id:229, topic:"Chores", intensity:0, note:"Laundry piling up." }],
  "2021-06-25": [
    { id:224, topic:"Religion", intensity:1, note:"Prayer disagreement." },
    { id:225, topic:"Money", intensity:1, note:"Credit card bill surprise." },
  ],
  "2021-07-11": [{ id:232, topic:"Parenting", intensity:1, note:"Screen time rules." }],
  "2021-07-20": [
    { id:230, topic:"Money", intensity:0, note:"Overspending on groceries." },
    { id:231, topic:"In-Laws", intensity:0, note:"Too many calls from them." },
  ],
  "2021-08-05": [{ id:233, topic:"In-Laws", intensity:1, note:"Boundary issues." }],
  "2021-08-16": [
    { id:236, topic:"Politics", intensity:1, note:"Differing views at dinner." },
    { id:237, topic:"Work", intensity:0, note:"Stress brought home." },
  ],
  "2021-08-22": [
    { id:234, topic:"Work", intensity:2, note:"Late nights again." },
    { id:235, topic:"In-Laws", intensity:0, note:"Parenting interference." },
  ],
  "2021-09-01": [
    { id:241, topic:"Work", intensity:2, note:"Missed family event for work." },
    { id:242, topic:"Work", intensity:0, note:"Missed family event for work." },
  ],
  "2021-09-08": [
    { id:239, topic:"Parenting", intensity:1, note:"School issue." },
    { id:240, topic:"Religion", intensity:0, note:"Holiday traditions clash." },
  ],
  "2021-09-19": [{ id:238, topic:"Money", intensity:0, note:"Credit card bill surprise." }],
  "2021-10-02": [
    { id:247, topic:"Politics", intensity:0, note:"Policy disagreement." },
    { id:248, topic:"Money", intensity:2, note:"Budget disagreement." },
  ],
  "2021-10-14": [{ id:243, topic:"Money", intensity:0, note:"Overspending on groceries." }],
  "2021-10-15": [{ id:244, topic:"Work", intensity:0, note:"Job stress tension." }],
  "2021-10-24": [
    { id:245, topic:"Chores", intensity:0, note:"Yard work ignored." },
    { id:246, topic:"Religion", intensity:0, note:"Church attendance views." },
  ],
  "2021-11-07": [{ id:253, topic:"Money", intensity:1, note:"Unexpected bill." }],
  "2021-11-14": [
    { id:249, topic:"Money", intensity:0, note:"Credit card bill surprise." },
    { id:250, topic:"Communication", intensity:0, note:"Not listening." },
  ],
  "2021-11-16": [
    { id:251, topic:"Communication", intensity:1, note:"Argument escalated." },
    { id:252, topic:"Religion", intensity:0, note:"Kids religious upbringing." },
  ],
  "2021-12-11": [{ id:255, topic:"Money", intensity:2, note:"Credit card bill surprise." }],
  "2021-12-24": [{ id:254, topic:"Money", intensity:1, note:"Unexpected bill." }],
  "2022-01-03": [{ id:256, topic:"Communication", intensity:0, note:"Argument escalated." }],
  "2022-01-20": [{ id:257, topic:"Money", intensity:1, note:"Savings argument." }],
  "2022-01-22": [
    { id:258, topic:"In-Laws", intensity:0, note:"Parenting interference." },
    { id:259, topic:"Work", intensity:0, note:"Late nights again." },
  ],
  "2022-02-03": [
    { id:264, topic:"Politics", intensity:1, note:"Policy disagreement." },
    { id:265, topic:"Politics", intensity:0, note:"Policy disagreement." },
  ],
  "2022-02-11": [{ id:261, topic:"Parenting", intensity:1, note:"Summer camp plans." }],
  "2022-02-15": [{ id:260, topic:"Religion", intensity:1, note:"Prayer disagreement." }],
  "2022-02-25": [
    { id:262, topic:"Chores", intensity:2, note:"Dishes not done." },
    { id:263, topic:"Work", intensity:0, note:"Late nights again." },
  ],
  "2022-03-04": [
    { id:267, topic:"In-Laws", intensity:1, note:"Parenting interference." },
    { id:268, topic:"Work", intensity:1, note:"Work call during dinner." },
  ],
  "2022-03-05": [
    { id:269, topic:"In-Laws", intensity:2, note:"Holiday visit conflict." },
    { id:270, topic:"Parenting", intensity:1, note:"School issue." },
  ],
  "2022-03-09": [{ id:271, topic:"Money", intensity:0, note:"Budget disagreement." }],
  "2022-03-22": [{ id:266, topic:"Parenting", intensity:1, note:"Discipline disagreement." }],
  "2022-04-06": [
    { id:272, topic:"Politics", intensity:0, note:"Election stress." },
    { id:273, topic:"Chores", intensity:1, note:"Yard work ignored." },
  ],
  "2022-04-15": [
    { id:275, topic:"Money", intensity:2, note:"Budget disagreement." },
    { id:276, topic:"Work", intensity:1, note:"Work call during dinner." },
  ],
  "2022-04-18": [
    { id:277, topic:"Chores", intensity:2, note:"Laundry piling up." },
    { id:278, topic:"Chores", intensity:2, note:"Laundry piling up." },
  ],
  "2022-04-24": [{ id:274, topic:"Communication", intensity:0, note:"Tone of voice issue." }],
  "2022-05-01": [
    { id:279, topic:"Work", intensity:0, note:"Stress brought home." },
    { id:280, topic:"Communication", intensity:2, note:"Not listening." },
  ],
  "2022-05-06": [{ id:281, topic:"Work", intensity:2, note:"Missed family event for work." }],
  "2022-05-11": [
    { id:284, topic:"Intimacy", intensity:0, note:"Feeling disconnected." },
    { id:285, topic:"In-Laws", intensity:0, note:"Boundary issues." },
  ],
  "2022-05-24": [
    { id:282, topic:"In-Laws", intensity:2, note:"Too many calls from them." },
    { id:283, topic:"Work", intensity:0, note:"Late nights again." },
  ],
  "2022-05-26": [
    { id:286, topic:"Politics", intensity:0, note:"Election stress." },
    { id:287, topic:"Parenting", intensity:2, note:"School issue." },
  ],
  "2022-06-02": [{ id:291, topic:"Politics", intensity:2, note:"Policy disagreement." }],
  "2022-06-09": [
    { id:289, topic:"Politics", intensity:0, note:"Policy disagreement." },
    { id:290, topic:"Work", intensity:0, note:"Missed family event for work." },
  ],
  "2022-06-19": [{ id:288, topic:"Communication", intensity:0, note:"Tone of voice issue." }],
  "2022-07-03": [{ id:296, topic:"In-Laws", intensity:0, note:"Holiday visit conflict." }],
  "2022-07-12": [
    { id:292, topic:"Intimacy", intensity:1, note:"Feeling disconnected." },
    { id:293, topic:"In-Laws", intensity:1, note:"Holiday plans clash." },
  ],
  "2022-07-14": [
    { id:294, topic:"Communication", intensity:1, note:"Argument escalated." },
    { id:295, topic:"Chores", intensity:0, note:"Grocery not restocked." },
  ],
  "2022-08-07": [{ id:299, topic:"In-Laws", intensity:1, note:"Boundary issues." }],
  "2022-08-10": [
    { id:297, topic:"Religion", intensity:0, note:"Holiday traditions clash." },
    { id:298, topic:"Politics", intensity:1, note:"Differing views at dinner." },
  ],
  "2022-08-14": [
    { id:300, topic:"Parenting", intensity:2, note:"Discipline disagreement." },
    { id:301, topic:"In-Laws", intensity:0, note:"Too many calls from them." },
  ],
  "2022-08-26": [{ id:302, topic:"Money", intensity:0, note:"Savings argument." }],
  "2022-09-14": [{ id:304, topic:"Money", intensity:2, note:"Credit card bill surprise." }],
  "2022-09-15": [{ id:303, topic:"Communication", intensity:1, note:"Talked over again." }],
  "2022-10-06": [
    { id:307, topic:"Religion", intensity:1, note:"Prayer disagreement." },
    { id:308, topic:"Communication", intensity:2, note:"Argument escalated." },
  ],
  "2022-10-08": [
    { id:305, topic:"Money", intensity:1, note:"Credit card bill surprise." },
    { id:306, topic:"Religion", intensity:0, note:"Different beliefs surfacing." },
  ],
  "2022-10-17": [{ id:313, topic:"In-Laws", intensity:0, note:"Boundary issues." }],
  "2022-10-23": [
    { id:311, topic:"Politics", intensity:1, note:"Differing views at dinner." },
    { id:312, topic:"In-Laws", intensity:0, note:"Parenting interference." },
  ],
  "2022-10-26": [
    { id:309, topic:"Chores", intensity:1, note:"Grocery not restocked." },
    { id:310, topic:"Religion", intensity:0, note:"Holiday traditions clash." },
  ],
  "2022-11-05": [
    { id:314, topic:"Chores", intensity:1, note:"Dishes not done." },
    { id:315, topic:"Communication", intensity:0, note:"Argument escalated." },
  ],
  "2022-11-08": [
    { id:316, topic:"Communication", intensity:0, note:"Not listening." },
    { id:317, topic:"Communication", intensity:2, note:"Argument escalated." },
  ],
  "2022-12-19": [{ id:320, topic:"Religion", intensity:0, note:"Different beliefs surfacing." }],
  "2022-12-25": [
    { id:318, topic:"Religion", intensity:0, note:"Kids religious upbringing." },
    { id:319, topic:"In-Laws", intensity:1, note:"Holiday plans clash." },
  ],
  "2023-01-01": [
    { id:321, topic:"Chores", intensity:2, note:"Laundry piling up." },
    { id:322, topic:"Politics", intensity:0, note:"Political post argument." },
  ],
  "2023-01-11": [
    { id:324, topic:"Chores", intensity:0, note:"Grocery not restocked." },
    { id:325, topic:"Intimacy", intensity:0, note:"Exhausted and distant." },
  ],
  "2023-01-13": [{ id:323, topic:"Parenting", intensity:1, note:"Discipline disagreement." }],
  "2023-01-22": [
    { id:326, topic:"Communication", intensity:0, note:"Not listening." },
    { id:327, topic:"In-Laws", intensity:2, note:"Holiday plans clash." },
  ],
  "2023-01-26": [{ id:328, topic:"Politics", intensity:0, note:"News argument." }],
  "2023-02-03": [{ id:330, topic:"Chores", intensity:0, note:"Grocery not restocked." }],
  "2023-02-21": [{ id:329, topic:"Money", intensity:2, note:"Budget disagreement." }],
  "2023-02-25": [{ id:331, topic:"Work", intensity:1, note:"Work call during dinner." }],
  "2023-03-06": [{ id:332, topic:"Chores", intensity:2, note:"Dishes not done." }],
  "2023-03-20": [{ id:333, topic:"In-Laws", intensity:1, note:"Holiday plans clash." }],
  "2023-03-23": [{ id:336, topic:"Money", intensity:0, note:"Savings argument." }],
  "2023-03-24": [
    { id:334, topic:"Work", intensity:0, note:"Late nights again." },
    { id:335, topic:"Parenting", intensity:1, note:"School issue." },
  ],
  "2023-04-03": [{ id:337, topic:"Communication", intensity:2, note:"Felt dismissed." }],
  "2023-04-11": [
    { id:342, topic:"Intimacy", intensity:2, note:"Feeling disconnected." },
    { id:343, topic:"In-Laws", intensity:2, note:"Too many calls from them." },
  ],
  "2023-04-17": [
    { id:338, topic:"Intimacy", intensity:1, note:"Feeling unappreciated." },
    { id:339, topic:"Chores", intensity:0, note:"Messy kitchen." },
  ],
  "2023-04-21": [
    { id:340, topic:"Politics", intensity:1, note:"Political post argument." },
    { id:341, topic:"Communication", intensity:2, note:"Argument escalated." },
  ],
  "2023-05-11": [{ id:351, topic:"In-Laws", intensity:0, note:"Too many calls from them." }],
  "2023-05-13": [
    { id:349, topic:"Politics", intensity:1, note:"Political post argument." },
    { id:350, topic:"Religion", intensity:1, note:"Church attendance views." },
  ],
  "2023-05-19": [{ id:344, topic:"Religion", intensity:2, note:"Holiday traditions clash." }],
  "2023-05-20": [
    { id:345, topic:"Work", intensity:0, note:"Work call during dinner." },
    { id:346, topic:"Intimacy", intensity:0, note:"Ships passing." },
  ],
  "2023-05-22": [
    { id:347, topic:"Politics", intensity:0, note:"Differing views at dinner." },
    { id:348, topic:"Parenting", intensity:0, note:"Bedtime routine." },
  ],
  "2023-06-12": [{ id:356, topic:"Work", intensity:0, note:"Missed family event for work." }],
  "2023-06-16": [
    { id:357, topic:"Politics", intensity:1, note:"Election stress." },
    { id:358, topic:"Work", intensity:0, note:"Work call during dinner." },
  ],
  "2023-06-19": [
    { id:354, topic:"In-Laws", intensity:0, note:"Holiday visit conflict." },
    { id:355, topic:"Work", intensity:0, note:"Job stress tension." },
  ],
  "2023-06-22": [
    { id:352, topic:"Communication", intensity:2, note:"Argument escalated." },
    { id:353, topic:"Intimacy", intensity:0, note:"Feeling unappreciated." },
  ],
  "2023-07-01": [
    { id:360, topic:"Chores", intensity:1, note:"Grocery not restocked." },
    { id:361, topic:"Parenting", intensity:2, note:"Summer camp plans." },
  ],
  "2023-07-10": [{ id:359, topic:"In-Laws", intensity:0, note:"Holiday visit conflict." }],
  "2023-07-23": [
    { id:362, topic:"Religion", intensity:1, note:"Kids religious upbringing." },
    { id:363, topic:"Chores", intensity:2, note:"Yard work ignored." },
  ],
  "2023-08-03": [{ id:367, topic:"Politics", intensity:0, note:"Political post argument." }],
  "2023-08-04": [{ id:364, topic:"Money", intensity:0, note:"Unexpected bill." }],
  "2023-08-13": [
    { id:368, topic:"Communication", intensity:0, note:"Argument escalated." },
    { id:369, topic:"Money", intensity:1, note:"Credit card bill surprise." },
  ],
  "2023-08-16": [{ id:370, topic:"Work", intensity:0, note:"Stress brought home." }],
  "2023-08-27": [
    { id:365, topic:"Parenting", intensity:2, note:"Screen time rules." },
    { id:366, topic:"Politics", intensity:1, note:"Policy disagreement." },
  ],
  "2023-09-06": [
    { id:372, topic:"In-Laws", intensity:0, note:"Parenting interference." },
    { id:373, topic:"In-Laws", intensity:1, note:"Holiday plans clash." },
  ],
  "2023-09-08": [{ id:371, topic:"Chores", intensity:0, note:"Grocery not restocked." }],
  "2023-09-18": [{ id:374, topic:"Work", intensity:2, note:"Job stress tension." }],
  "2023-10-04": [{ id:376, topic:"Money", intensity:0, note:"Overspending on groceries." }],
  "2023-10-14": [{ id:375, topic:"Chores", intensity:2, note:"Laundry piling up." }],
  "2023-10-18": [
    { id:377, topic:"Religion", intensity:0, note:"Kids religious upbringing." },
    { id:378, topic:"Communication", intensity:2, note:"Argument escalated." },
  ],
  "2023-11-02": [
    { id:384, topic:"Communication", intensity:0, note:"Felt dismissed." },
    { id:385, topic:"Chores", intensity:0, note:"Grocery not restocked." },
  ],
  "2023-11-03": [{ id:381, topic:"Chores", intensity:1, note:"Grocery not restocked." }],
  "2023-11-14": [
    { id:386, topic:"Communication", intensity:2, note:"Argument escalated." },
    { id:387, topic:"Money", intensity:1, note:"Overspending on groceries." },
  ],
  "2023-11-15": [
    { id:379, topic:"In-Laws", intensity:0, note:"Too many calls from them." },
    { id:380, topic:"Money", intensity:2, note:"Overspending on groceries." },
  ],
  "2023-11-20": [
    { id:382, topic:"Chores", intensity:2, note:"Grocery not restocked." },
    { id:383, topic:"Religion", intensity:2, note:"Different beliefs surfacing." },
  ],
  "2023-12-04": [{ id:389, topic:"Politics", intensity:0, note:"Political post argument." }],
  "2023-12-11": [{ id:388, topic:"Politics", intensity:1, note:"Election stress." }],
  "2023-12-13": [
    { id:392, topic:"Parenting", intensity:0, note:"Summer camp plans." },
    { id:393, topic:"Work", intensity:1, note:"Work call during dinner." },
  ],
  "2023-12-25": [
    { id:390, topic:"Money", intensity:0, note:"Unexpected bill." },
    { id:391, topic:"Chores", intensity:2, note:"Grocery not restocked." },
  ],
  "2024-01-14": [
    { id:395, topic:"Parenting", intensity:1, note:"Discipline disagreement." },
    { id:396, topic:"Religion", intensity:2, note:"Kids religious upbringing." },
  ],
  "2024-01-18": [{ id:394, topic:"Work", intensity:2, note:"Stress brought home." }],
  "2024-02-08": [
    { id:402, topic:"Chores", intensity:1, note:"Grocery not restocked." },
    { id:403, topic:"Intimacy", intensity:0, note:"Ships passing." },
  ],
  "2024-02-14": [
    { id:397, topic:"Politics", intensity:0, note:"Differing views at dinner." },
    { id:398, topic:"Politics", intensity:1, note:"Differing views at dinner." },
  ],
  "2024-02-16": [
    { id:400, topic:"Politics", intensity:0, note:"Election stress." },
    { id:401, topic:"In-Laws", intensity:1, note:"Boundary issues." },
  ],
  "2024-02-27": [{ id:399, topic:"In-Laws", intensity:1, note:"Holiday plans clash." }],
  "2024-03-07": [
    { id:408, topic:"Parenting", intensity:2, note:"Bedtime routine." },
    { id:409, topic:"Parenting", intensity:1, note:"Bedtime routine." },
  ],
  "2024-03-08": [{ id:411, topic:"Religion", intensity:2, note:"Kids religious upbringing." }],
  "2024-03-11": [
    { id:406, topic:"Communication", intensity:2, note:"Talked over again." },
    { id:407, topic:"Religion", intensity:2, note:"Holiday traditions clash." },
  ],
  "2024-03-15": [
    { id:404, topic:"Work", intensity:2, note:"Missed family event for work." },
    { id:405, topic:"Money", intensity:0, note:"Savings argument." },
  ],
  "2024-03-23": [{ id:410, topic:"Chores", intensity:0, note:"Laundry piling up." }],
  "2024-04-13": [{ id:415, topic:"In-Laws", intensity:2, note:"Holiday visit conflict." }],
  "2024-04-20": [{ id:412, topic:"Intimacy", intensity:2, note:"Ships passing." }],
  "2024-04-21": [
    { id:416, topic:"Parenting", intensity:1, note:"Screen time rules." },
    { id:417, topic:"Religion", intensity:0, note:"Kids religious upbringing." },
  ],
  "2024-04-23": [
    { id:413, topic:"Intimacy", intensity:1, note:"Feeling unappreciated." },
    { id:414, topic:"Politics", intensity:0, note:"Election stress." },
  ],
  "2024-05-02": [{ id:418, topic:"In-Laws", intensity:0, note:"Holiday plans clash." }],
  "2024-05-11": [{ id:419, topic:"Work", intensity:1, note:"Job stress tension." }],
  "2024-06-03": [
    { id:422, topic:"In-Laws", intensity:1, note:"Holiday plans clash." },
    { id:423, topic:"In-Laws", intensity:1, note:"Too many calls from them." },
  ],
  "2024-06-06": [
    { id:420, topic:"Work", intensity:1, note:"Job stress tension." },
    { id:421, topic:"Chores", intensity:0, note:"Yard work ignored." },
  ],
  "2024-06-20": [{ id:424, topic:"Religion", intensity:2, note:"Prayer disagreement." }],
  "2024-07-09": [{ id:431, topic:"Intimacy", intensity:0, note:"Need more quality time." }],
  "2024-07-14": [
    { id:427, topic:"In-Laws", intensity:2, note:"Parenting interference." },
    { id:428, topic:"Money", intensity:2, note:"Savings argument." },
  ],
  "2024-07-21": [
    { id:425, topic:"In-Laws", intensity:0, note:"Holiday plans clash." },
    { id:426, topic:"Religion", intensity:0, note:"Different beliefs surfacing." },
  ],
  "2024-07-23": [
    { id:429, topic:"Money", intensity:1, note:"Credit card bill surprise." },
    { id:430, topic:"Religion", intensity:2, note:"Kids religious upbringing." },
  ],
  "2024-08-22": [{ id:432, topic:"Parenting", intensity:2, note:"Screen time rules." }],
  "2024-08-24": [
    { id:435, topic:"Communication", intensity:0, note:"Talked over again." },
    { id:436, topic:"Politics", intensity:2, note:"News argument." },
  ],
  "2024-08-25": [
    { id:433, topic:"Religion", intensity:0, note:"Kids religious upbringing." },
    { id:434, topic:"Chores", intensity:0, note:"Yard work ignored." },
  ],
  "2024-08-27": [
    { id:437, topic:"Chores", intensity:0, note:"Grocery not restocked." },
    { id:438, topic:"In-Laws", intensity:1, note:"Parenting interference." },
  ],
  "2024-09-03": [
    { id:440, topic:"Parenting", intensity:2, note:"Screen time rules." },
    { id:441, topic:"In-Laws", intensity:1, note:"Holiday plans clash." },
  ],
  "2024-09-15": [{ id:439, topic:"Work", intensity:2, note:"Missed family event for work." }],
  "2024-10-09": [{ id:446, topic:"Money", intensity:2, note:"Overspending on groceries." }],
  "2024-10-19": [
    { id:447, topic:"Parenting", intensity:0, note:"Summer camp plans." },
    { id:448, topic:"Chores", intensity:0, note:"Yard work ignored." },
  ],
  "2024-10-22": [
    { id:442, topic:"Intimacy", intensity:0, note:"Need more quality time." },
    { id:443, topic:"Religion", intensity:0, note:"Prayer disagreement." },
  ],
  "2024-10-24": [
    { id:444, topic:"Work", intensity:1, note:"Missed family event for work." },
    { id:445, topic:"In-Laws", intensity:1, note:"Holiday visit conflict." },
  ],
  "2024-11-05": [{ id:451, topic:"Intimacy", intensity:0, note:"Exhausted and distant." }],
  "2024-11-14": [
    { id:452, topic:"Money", intensity:0, note:"Budget disagreement." },
    { id:453, topic:"Parenting", intensity:2, note:"Bedtime routine." },
  ],
  "2024-11-19": [{ id:449, topic:"Religion", intensity:1, note:"Kids religious upbringing." }],
  "2024-11-21": [{ id:454, topic:"Work", intensity:1, note:"Job stress tension." }],
  "2024-11-24": [{ id:450, topic:"Intimacy", intensity:0, note:"Feeling unappreciated." }],
  "2024-12-02": [
    { id:455, topic:"Work", intensity:2, note:"Job stress tension." },
    { id:456, topic:"Work", intensity:0, note:"Job stress tension." },
  ],
  "2024-12-26": [{ id:457, topic:"Work", intensity:2, note:"Late nights again." }],
  "2025-01-05": [{ id:459, topic:"Politics", intensity:0, note:"Differing views at dinner." }],
  "2025-01-20": [{ id:461, topic:"Intimacy", intensity:0, note:"Exhausted and distant." }],
  "2025-01-25": [{ id:458, topic:"In-Laws", intensity:2, note:"Too many calls from them." }],
  "2025-01-26": [{ id:460, topic:"Money", intensity:0, note:"Overspending on groceries." }],
  "2025-02-05": [
    { id:462, topic:"Politics", intensity:0, note:"Election stress." },
    { id:463, topic:"Religion", intensity:1, note:"Kids religious upbringing." },
  ],
  "2025-02-24": [{ id:464, topic:"Religion", intensity:1, note:"Prayer disagreement." }],
  "2025-03-24": [
    { id:465, topic:"Religion", intensity:1, note:"Church attendance views." },
    { id:466, topic:"Money", intensity:2, note:"Savings argument." },
  ],
  "2025-03-26": [
    { id:467, topic:"Parenting", intensity:1, note:"Bedtime routine." },
    { id:468, topic:"Parenting", intensity:2, note:"School issue." },
  ],
  "2025-04-03": [
    { id:469, topic:"Communication", intensity:2, note:"Argument escalated." },
    { id:470, topic:"In-Laws", intensity:1, note:"Boundary issues." },
  ],
  "2025-04-05": [
    { id:471, topic:"Parenting", intensity:2, note:"Screen time rules." },
    { id:472, topic:"Politics", intensity:1, note:"Differing views at dinner." },
  ],
  "2025-04-09": [
    { id:473, topic:"Religion", intensity:2, note:"Different beliefs surfacing." },
    { id:474, topic:"Intimacy", intensity:2, note:"Feeling unappreciated." },
  ],
  "2025-05-04": [{ id:477, topic:"Communication", intensity:0, note:"Tone of voice issue." }],
  "2025-05-11": [{ id:478, topic:"Politics", intensity:0, note:"Policy disagreement." }],
  "2025-05-14": [
    { id:479, topic:"Parenting", intensity:0, note:"Bedtime routine." },
    { id:480, topic:"Money", intensity:2, note:"Unexpected bill." },
  ],
  "2025-05-22": [
    { id:481, topic:"Intimacy", intensity:0, note:"Ships passing." },
    { id:482, topic:"Work", intensity:0, note:"Missed family event for work." },
  ],
  "2025-05-24": [
    { id:475, topic:"Intimacy", intensity:2, note:"Feeling unappreciated." },
    { id:476, topic:"Parenting", intensity:0, note:"Screen time rules." },
  ],
  "2025-06-04": [
    { id:483, topic:"Parenting", intensity:1, note:"Summer camp plans." },
    { id:484, topic:"Work", intensity:2, note:"Job stress tension." },
  ],
  "2025-06-12": [{ id:485, topic:"In-Laws", intensity:0, note:"Parenting interference." }],
  "2025-06-18": [
    { id:486, topic:"Intimacy", intensity:0, note:"Need more quality time." },
    { id:487, topic:"Chores", intensity:1, note:"Grocery not restocked." },
  ],
  "2025-07-05": [{ id:488, topic:"Parenting", intensity:1, note:"Discipline disagreement." }],
  "2025-07-24": [
    { id:489, topic:"Communication", intensity:1, note:"Talked over again." },
    { id:490, topic:"Intimacy", intensity:0, note:"Exhausted and distant." },
  ],
  "2025-08-02": [{ id:491, topic:"Money", intensity:1, note:"Overspending on groceries." }],
  "2025-08-05": [
    { id:492, topic:"Communication", intensity:1, note:"Not listening." },
    { id:493, topic:"Communication", intensity:0, note:"Argument escalated." },
  ],
  "2025-09-12": [{ id:494, topic:"In-Laws", intensity:1, note:"Boundary issues." }],
  "2025-09-14": [
    { id:495, topic:"Politics", intensity:1, note:"Election stress." },
    { id:496, topic:"Work", intensity:0, note:"Job stress tension." },
  ],
  "2025-10-01": [
    { id:497, topic:"Work", intensity:1, note:"Work call during dinner." },
    { id:498, topic:"In-Laws", intensity:0, note:"Holiday visit conflict." },
  ],
  "2025-10-07": [
    { id:499, topic:"Communication", intensity:0, note:"Not listening." },
    { id:500, topic:"Politics", intensity:1, note:"Policy disagreement." },
  ],
  "2025-11-02": [{ id:507, topic:"Communication", intensity:2, note:"Tone of voice issue." }],
  "2025-11-03": [
    { id:501, topic:"Money", intensity:1, note:"Credit card bill surprise." },
    { id:502, topic:"Intimacy", intensity:1, note:"Ships passing." },
  ],
  "2025-11-13": [
    { id:503, topic:"Communication", intensity:0, note:"Not listening." },
    { id:504, topic:"Money", intensity:2, note:"Budget disagreement." },
  ],
  "2025-11-24": [
    { id:505, topic:"Intimacy", intensity:0, note:"Feeling disconnected." },
    { id:506, topic:"Work", intensity:0, note:"Missed family event for work." },
  ],
  "2025-12-06": [{ id:510, topic:"Parenting", intensity:0, note:"Discipline disagreement." }],
  "2025-12-11": [{ id:508, topic:"Politics", intensity:1, note:"Policy disagreement." }],
  "2025-12-25": [{ id:509, topic:"Intimacy", intensity:0, note:"Need more quality time." }],
  "2026-04-03": [{ id:1, topic:"Chores", intensity:0, note:"Dishes left in sink again." }],
  "2026-04-07": [
    { id:2, topic:"Money", intensity:1, note:"Credit card bill higher than expected." },
    { id:3, topic:"Work", intensity:0, note:"Came home late without calling." },
  ],
  "2026-04-13": [{ id:4, topic:"Communication", intensity:2, note:"Felt dismissed during conversation." }],
  "2026-04-15": [{ id:5, topic:"In-Laws", intensity:1, note:"Holiday plans disagreement." }],
};

function toKey(y,m,d){ return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }
function getDaysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
function getFirstDay(y,m){ return new Date(y,m,1).getDay(); }
function newId(){ return Date.now()+Math.random(); }

function solidBtn(bg){
  return { background:bg, border:"none", borderRadius:8, color:"#ffffff",
    fontSize:14, fontWeight:700, padding:"8px 14px", cursor:"pointer", letterSpacing:"0.03em" };
}
const ghostBtn = {
  background:"none", border:"1px solid #b8d4c4", borderRadius:8,
  color:"#2a4a5a", fontSize:14, padding:"8px 14px", cursor:"pointer", flex:1,
};
function Label({ children }){
  return <div style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.15em", textTransform:"uppercase" }}>{children}</div>;
}
function SectionLabel({ children }){
  return <div style={{ fontSize:11, color:"#2a4a5a", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:4 }}>{children}</div>;
}

function IntensityBar({ value, onChange }){
  return (
    <div style={{ display:"flex", gap:8 }}>
      {INTENSITIES.map((it,i) => (
        <button key={i} onClick={() => onChange(i)} style={{
          flex:1, padding:"8px 4px", borderRadius:8,
          border:`2px solid ${value===i ? it.color : "#b8d4c4"}`,
          background: value===i ? it.color+"22" : "transparent",
          cursor:"pointer", transition:"all 0.15s",
        }}>
          <div style={{ fontSize:13, fontWeight:700, color:value===i ? it.color : "#2a4a5a" }}>{it.label}</div>
          <div style={{ fontSize:11, color:value===i ? it.color+"cc" : "#3a5a6a", marginTop:2 }}>{it.desc}</div>
        </button>
      ))}
    </div>
  );
}

function EntryForm({ initial, onSave, onCancel, customTopics, onAddCustomTopic }){
  const [topic,       setTopic]       = useState(initial?.topic     || TOPICS[0]);
  const [intensity,   setIntensity]   = useState(initial?.intensity ?? 0);
  const [note,        setNote]        = useState(initial?.note      || "");
  const [addingTopic, setAddingTopic] = useState(false);
  const [customTopic, setCustomTopic] = useState("");

  function handleAddCustomTopic(){
    const t = customTopic.trim();
    if(!t) return;
    onAddCustomTopic(t);
    setTopic(t);
    setAddingTopic(false);
    setCustomTopic("");
  }

  const allTopics = [...TOPICS, ...customTopics];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div>
        <Label>Topic</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:6 }}>
          {allTopics.map(t => (
            <button key={t} onClick={() => setTopic(t)} style={{
              padding:"5px 12px", borderRadius:20,
              border:`1.5px solid ${topic===t ? "#1a6b3a" : "#b8d4c4"}`,
              background: topic===t ? "#1a237e18" : "transparent",
              color: topic===t ? "#1a6b3a" : "#2a4a5a",
              fontSize:14, cursor:"pointer", transition:"all 0.12s",
            }}>{t}</button>
          ))}
          {/* Add custom topic button */}
          {!addingTopic && (
            <button onClick={() => setAddingTopic(true)} style={{
              padding:"5px 12px", borderRadius:20,
              border:"1.5px dashed #b8d4c4",
              background:"transparent",
              color:"#3a5a6a", fontSize:14, cursor:"pointer",
            }}>+ Custom</button>
          )}
        </div>
        {/* Custom topic input */}
        {addingTopic && (
          <div style={{ display:"flex", gap:6, marginTop:8, alignItems:"center" }}>
            <input
              autoFocus
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter") handleAddCustomTopic(); if(e.key==="Escape") setAddingTopic(false); }}
              placeholder="Topic name..."
              style={{ flex:1, background:"#e8f0ec", border:"1.5px solid #b8d4c4",
                borderRadius:8, color:"#1a3040", fontSize:15, padding:"6px 10px",
                outline:"none", fontFamily:"inherit" }}
            />
            <button onClick={handleAddCustomTopic} style={{
              background:"#1a6b3a", border:"none", borderRadius:8,
              color:"#fff", fontSize:14, fontWeight:700,
              padding:"6px 12px", cursor:"pointer",
            }}>Add</button>
            <button onClick={() => { setAddingTopic(false); setCustomTopic(""); }} style={{
              background:"none", border:"1px solid #b8d4c4", borderRadius:8,
              color:"#3a5a6a", fontSize:14, padding:"6px 10px", cursor:"pointer",
            }}>✕</button>
          </div>
        )}
      </div>
      <div>
        <Label>Intensity</Label>
        <div style={{ marginTop:6 }}><IntensityBar value={intensity} onChange={setIntensity} /></div>
      </div>
      <div>
        <Label>Notes <span style={{ color:"#3a5a6a", fontWeight:600 }}>(optional)</span></Label>
        <textarea value={note} onChange={e => setNote(e.target.value)}
          placeholder="Brief description..." rows={3}
          style={{ width:"100%", marginTop:6, background:"#e8f0ec",
            border:"1.5px solid #b8d4c4", borderRadius:8, color:"#1a3040",
            fontSize:15, padding:"8px 10px", resize:"none", outline:"none",
            boxSizing:"border-box", fontFamily:"inherit" }} />
      </div>

      <div style={{ display:"flex", gap:8, marginTop:4 }}>
        <button onClick={onCancel} style={ghostBtn}>Cancel</button>
        <button onClick={() => onSave({ topic, intensity, note, id: initial?.id || newId() })}
          style={{ ...solidBtn("#1a6b3a"), flex:2 }}>
          {initial ? "Update" : "Log Argument"}
        </button>
      </div>
    </div>
  );
}

const ENCOURAGEMENT = [
  "Everyone has arguments with those they love, it's part of growing stronger together. Keep your chin up!",
  "Consider doing something nice for the person you had an argument with to let them know you still love them.",
  "I'm sorry that happened. Consider getting several nights of sleep before discussing the topic again.",
];

function DayPanel({ dateKey, dateLabel, entries, onAdd, onUpdate, onDelete, customTopics, onAddCustomTopic }){
  const [adding,  setAdding]  = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast,   setToast]   = useState(null); // { message, color }

  function handleSaveNew(entry){
    onAdd(dateKey, entry);
    setAdding(false);
    setToast({ message: ENCOURAGEMENT[entry.intensity], color: INTENSITIES[entry.intensity].color });
    setTimeout(() => setToast(null), 10000);
  }

  return (
    <div style={{ marginTop:14, background:"#ffffff", border:"1px solid #b8d4c4",
      borderRadius:16, width:"100%", maxWidth:400, padding:"20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div>
          <div style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.15em", textTransform:"uppercase" }}>Selected Day</div>
          <div style={{ fontSize:22, fontWeight:700, color:"#1a3040", marginTop:2 }}>{dateLabel}</div>
        </div>
        {!adding && editing===null && (
          <button onClick={() => setAdding(true)} style={solidBtn("#1a6b3a")}>+ Log</button>
        )}
      </div>

      {/* Thought cloud */}
      {toast && (
        <div style={{ marginBottom:16, animation:"fadeInOut 10s ease forwards" }}>
          <style>{`
            @keyframes fadeInOut {
              0%   { opacity:0; transform:scale(0.93); }
              10%  { opacity:1; transform:scale(1); }
              75%  { opacity:1; }
              100% { opacity:0; }
            }
          `}</style>
          <style>{`
            @keyframes fadeInOut {
              0%   { opacity:0; transform:scale(0.93); }
              10%  { opacity:1; transform:scale(1); }
              75%  { opacity:1; }
              100% { opacity:0; }
            }
            .thought-cloud {
              position: relative;
              background: var(--cloud-bg);
              border: 2.5px solid var(--cloud-border);
              border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
              padding: 32px 36px;
              margin: 8px 8px 48px 8px;
              box-shadow: 0 4px 16px var(--cloud-shadow);
              filter: drop-shadow(0 2px 6px var(--cloud-shadow));
            }
            .thought-cloud::before,
            .thought-cloud::after {
              content: '';
              position: absolute;
              background: var(--cloud-bg);
              border: 2.5px solid var(--cloud-border);
              border-radius: 50%;
            }
            .thought-cloud::before {
              width: 36px; height: 36px;
              bottom: -28px; left: 36px;
            }
            .thought-cloud::after {
              width: 22px; height: 22px;
              bottom: -50px; left: 22px;
            }
          `}</style>
          <div
            className="thought-cloud"
            style={{
              '--cloud-bg': toast.color + '22',
              '--cloud-border': toast.color + '88',
              '--cloud-shadow': toast.color + '33',
              fontSize:16, color:"#1a3040", lineHeight:1.7,
              fontStyle:"italic", textAlign:"center", fontWeight:700,
            }}
          >
            {toast.message}
            {/* Third tiny bubble via extra div */}
            <div style={{
              position:"absolute", bottom:"-68px", left:"12px",
              width:14, height:14, borderRadius:"50%",
              background: toast.color+"22",
              border: `2px solid ${toast.color}88`,
            }}/>
          </div>
        </div>
      )}

      {adding && (
        <div style={{ borderTop:"1px solid #b8d4c4", paddingTop:16, marginBottom:16 }}>
          <div style={{ fontSize:13, color:"#1a237e", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>New Entry</div>
          <EntryForm
            onSave={handleSaveNew}
            onCancel={() => setAdding(false)}
            customTopics={customTopics}
            onAddCustomTopic={onAddCustomTopic} />
        </div>
      )}
      {entries.length===0 && !adding ? (
        <div style={{ fontSize:15, color:"#3a5a6a", textAlign:"center", padding:"16px 0" }}>
          No arguments logged — peaceful day 🕊️
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {entries.map(e => {
            const it = INTENSITIES[e.intensity];
            if(editing===e.id){
              return (
                <div key={e.id} style={{ background:"#e8f0ec", borderRadius:10, padding:14 }}>
                  <EntryForm initial={e}
                    onSave={entry => { onUpdate(dateKey,entry); setEditing(null); }}
                    onCancel={() => setEditing(null)}
                    customTopics={customTopics}
                    onAddCustomTopic={onAddCustomTopic} />
                </div>
              );
            }
            return (
              <div key={e.id} style={{ background:"#e8f0ec", borderRadius:10,
                padding:"12px 14px", borderLeft:`3px solid ${it.color}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4, alignItems:"center" }}>
                    <span style={{ fontSize:13, fontWeight:700, color:it.color,
                      background:it.color+"18", padding:"2px 8px", borderRadius:10 }}>{it.label}</span>
                    <span style={{ fontSize:15, color:"#1a237e", fontWeight:700 }}>{e.topic}</span>

                  </div>
                  <div style={{ display:"flex", gap:4, marginLeft:8, flexShrink:0 }}>
                    <button onClick={() => setEditing(e.id)}
                      style={{ background:"none",border:"none",color:"#3a5a6a",fontSize:15,cursor:"pointer",padding:"2px 5px",borderRadius:4 }}>✎</button>
                    <button onClick={() => onDelete(dateKey,e.id)}
                      style={{ background:"none",border:"none",color:"#3a5a6a",fontSize:15,cursor:"pointer",padding:"2px 5px",borderRadius:4 }}>✕</button>
                  </div>
                </div>
                {e.note && <div style={{ fontSize:14,color:"#2a4a5a",marginTop:6,lineHeight:1.5 }}>{e.note}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SummaryStats({ data, year, month }){
  const [scope, setScope] = useState("month");

  const allEntries = Object.entries(data).flatMap(([k,entries]) =>
    entries.map(e => ({ ...e, dateKey:k }))
  );
  const monthPrefix = `${year}-${String(month+1).padStart(2,"0")}`;
  const scoped = scope==="month"
    ? allEntries.filter(e => e.dateKey.startsWith(monthPrefix))
    : allEntries;

  const total    = scoped.length;

  const topicMap = {};
  scoped.forEach(e => { topicMap[e.topic]=(topicMap[e.topic]||0)+1; });
  const topTopics = Object.entries(topicMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxTopic = topTopics[0]?.[1] || 1;

  const intCounts = [0,0,0];
  scoped.forEach(e => { intCounts[e.intensity]++; });

  // All-time monthly line chart — one series per intensity
  const monthlyByInt = {};
  allEntries.forEach(e => {
    const pfx = e.dateKey.slice(0,7);
    if(!monthlyByInt[pfx]) monthlyByInt[pfx] = [0,0,0];
    monthlyByInt[pfx][e.intensity]++;
  });
  const monthKeys = Object.keys(monthlyByInt).sort();

  // Auto-switch to yearly grouping if more than 12 months of data
  const useYearly = monthKeys.length > 12;
  const yearlyByInt = {};
  if(useYearly){
    allEntries.forEach(e => {
      const yr = e.dateKey.slice(0,4);
      if(!yearlyByInt[yr]) yearlyByInt[yr] = [0,0,0];
      yearlyByInt[yr][e.intensity]++;
    });
  }
  const trendKeys = useYearly ? Object.keys(yearlyByInt).sort() : monthKeys;
  const trendSource = useYearly ? yearlyByInt : monthlyByInt;
  const trendSeries = [0,1,2].map(i => trendKeys.map(k => trendSource[k][i]));
  const maxTrendVal = Math.max(...trendKeys.flatMap(k => trendSource[k]), 1);

  if(total===0) return (
    <div style={{ textAlign:"center", padding:"24px 0", color:"#3a5a6a", fontSize:15 }}>
      No data for {scope==="month" ? MONTHS[month] : "any period"} yet.
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      {/* Scope toggle */}
      <div style={{ display:"flex", background:"#e8f0ec", borderRadius:8, padding:3 }}>
        {[["month", MONTHS[month]], ["all","All Time"]].map(([s,lbl]) => (
          <button key={s} onClick={() => setScope(s)} style={{
            flex:1, padding:"7px 0", border:"none", borderRadius:6,
            background: scope===s ? "#c8e6d4" : "transparent",
            color: scope===s ? "#1a6b3a" : "#2a4a5a",
            fontSize:13, fontWeight:700, letterSpacing:"0.08em",
            textTransform:"uppercase", cursor:"pointer", transition:"all 0.15s",
          }}>{lbl}</button>
        ))}
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:8 }}>
        {[
          { label:"Total Arguments", value:total, color:"#1a237e" },
        ].map((s,i) => (
          <div key={i} style={{ background:"#e8f0ec", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:11, color:"#2a4a5a", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Intensity */}
      <div>
        <SectionLabel>By Intensity</SectionLabel>
        <div style={{ display:"flex", gap:6 }}>
          {INTENSITIES.map((it,i) => {
            const c = intCounts[i];
            const pct = total>0 ? Math.round((c/total)*100) : 0;
            return (
              <div key={i} style={{ flex:1, background:"#e8f0ec", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontSize:22, fontWeight:700, color:it.color }}>{c}</div>
                <div style={{ fontSize:11, color:it.color+"99", marginTop:1 }}>{it.label}</div>
                <div style={{ marginTop:6, height:3, borderRadius:2, background:"#b8d4c4" }}>
                  <div style={{ height:"100%", borderRadius:2, background:it.color, width:pct+"%" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top topics */}
      {topTopics.length>0 && (
        <div>
          <SectionLabel>Top Topics</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {topTopics.map(([topic,count]) => (
              <div key={topic} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:90, fontSize:13, color:"#2a4a5a", textAlign:"right", flexShrink:0 }}>{topic}</div>
                <div style={{ flex:1, height:8, background:"#e8f0ec", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:4, background:"#1a6b3a", width:`${(count/maxTopic)*100}%` }} />
                </div>
                <div style={{ width:16, fontSize:13, color:"#1a237e", fontWeight:700 }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* All-time line chart */}
      {scope==="all" && trendKeys.length >= 2 && (
        <div>
          <SectionLabel>All-Time Trend</SectionLabel>
          {/* Legend */}
          <div style={{ display:"flex", gap:12, marginTop:6, marginBottom:4 }}>
            {INTENSITIES.map((it,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:16, height:2.5, borderRadius:2, background:it.color }} />
                <span style={{ fontSize:11, color:it.color, letterSpacing:"0.06em", textTransform:"uppercase" }}>{it.label}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#e8f0ec", borderRadius:12, padding:"16px 8px 8px" }}>
            {(() => {
              const W = 320, H = 130, padL = 24, padR = 12, padT = 10, padB = 28;
              const innerW = W - padL - padR;
              const innerH = H - padT - padB;
              const n = trendKeys.length;
              const xOf = i => padL + (n===1 ? innerW/2 : (i/(n-1))*innerW);
              const yOf = v => padT + innerH - (v/maxTrendVal)*innerH;
              const gridVals = [0, Math.round(maxTrendVal/2), maxTrendVal];
              const currentPfx = `${year}-${String(month+1).padStart(2,"0")}`;
              return (
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", overflow:"visible" }}>
                  {/* Grid lines */}
                  {gridVals.map(v => (
                    <g key={v}>
                      <line x1={padL} y1={yOf(v)} x2={W-padR} y2={yOf(v)} stroke="#b8d4c4" strokeWidth="1" />
                      <text x={padL-4} y={yOf(v)+4} textAnchor="end" fill="#1a3040" fontSize="11" fontWeight="700">{v}</text>
                    </g>
                  ))}
                  {/* 3 lines */}
                  {trendSeries.map((vals, si) => {
                    const color = INTENSITIES[si].color;
                    const points = vals.map((v,i) => `${xOf(i)},${yOf(v)}`).join(" ");
                    return (
                      <polyline key={si} points={points} fill="none"
                        stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                    );
                  })}
                  {/* Dots per series */}
                  {trendSeries.map((vals, si) => {
                    const color = INTENSITIES[si].color;
                    return vals.map((v, i) => {
                      const cx = xOf(i), cy = yOf(v);
                      const isCur = trendKeys[i]===currentPfx;
                      return (
                        <circle key={`${si}-${i}`} cx={cx} cy={cy} r={isCur?4.5:3}
                          fill={isCur ? color : "#e8f0ec"} stroke={color} strokeWidth="1.8" />
                      );
                    });
                  })}
                  {/* X-axis labels */}
                  {trendKeys.map((k,i) => {
                    const lbl = useYearly ? k : MONTHS[parseInt(k.split("-")[1])-1].slice(0,3);
                    const isCur = useYearly
                      ? k === String(year)
                      : k === `${year}-${String(month+1).padStart(2,"0")}`;
                    return (
                      <text key={i} x={xOf(i)} y={H-4} textAnchor="middle"
                        fill={isCur?"#1a6b3a":"#1a3040"} fontSize="11" fontWeight={isCur?"700":"600"}>{lbl}</text>
                    );
                  })}
                </svg>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}

// ── Login Screen ───────────────────────────────────────────────
function LoginScreen({ onLogin }){
  const [mode,     setMode]     = useState("login"); // "login" | "signup"
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [partner,  setPartner]  = useState("");
  const [error,    setError]    = useState("");

  function handleSubmit(){
    if(!email || !password){ setError("Please fill in all fields."); return; }
    if(mode==="signup" && !name){ setError("Please enter your name."); return; }
    if(password.length < 6){ setError("Password must be at least 6 characters."); return; }
    // Store user info locally (real auth comes in Stage 2)
    const user = { email, name: name||email.split("@")[0], partner: partner||"My Partner" };
    try { localStorage.setItem("conflict_log_user", JSON.stringify(user)); } catch{}
    onLogin(user);
  }

  const inputStyle = {
    width:"100%", boxSizing:"border-box",
    background:"#e8f0ec", border:"1.5px solid #b8d4c4", borderRadius:10,
    color:"#1a3040", fontSize:16, padding:"12px 14px",
    outline:"none", fontFamily:"inherit", marginTop:6,
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"28px 16px", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      {/* Logo */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        {/* Between Us cloud logo */}
        <div style={{ position:"relative", display:"inline-block", marginBottom:12 }}>
          <style>{`
            .logo-cloud {
              background: #1a237e18;
              border: 2.5px solid #1a237e99;
              border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
              padding: 14px 32px;
              position: relative;
              display: inline-block;
            }
            .logo-cloud::before {
              content: '';
              position: absolute;
              width: 22px; height: 22px;
              background: #1a237e18;
              border: 2.5px solid #1a237e99;
              border-radius: 50%;
              bottom: -18px; left: 28px;
            }
            .logo-cloud::after {
              content: '';
              position: absolute;
              width: 13px; height: 13px;
              background: #1a237e18;
              border: 2px solid #1a237e99;
              border-radius: 50%;
              bottom: -30px; left: 18px;
            }
          `}</style>
          <div className="logo-cloud">
            <span style={{ fontSize:18, fontWeight:700, color:"#1a237e",
              letterSpacing:"0.3em", textTransform:"uppercase", fontFamily:"inherit" }}>
              Between Us
            </span>
          </div>
          {/* Third tiny bubble */}
          <div style={{ position:"absolute", width:8, height:8, borderRadius:"50%",
            background:"#1a237e18", border:"1.8px solid #1a237e99",
            bottom:-40, left:12 }} />
        </div>
        <div style={{ fontSize:30, fontWeight:700, color:"#1a3040", marginTop:18 }}>Argument Log</div>
        <div style={{ fontSize:14, color:"#3a5a6a", marginTop:6 }}>Track, reflect, and grow together</div>
      </div>

      {/* Card */}
      <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:18,
        width:"100%", maxWidth:380, padding:"28px 24px",
        boxShadow:"0 8px 32px rgba(26,96,58,0.1)" }}>

        {/* Mode toggle */}
        <div style={{ display:"flex", background:"#e8f0ec", borderRadius:10, padding:3, marginBottom:24 }}>
          {[["login","Sign In"],["signup","Create Account"]].map(([m,lbl]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
              flex:1, padding:"9px 0", border:"none", borderRadius:8,
              background: mode===m ? "#ffffff" : "transparent",
              color: mode===m ? "#1a6b3a" : "#3a5a6a",
              fontSize:14, fontWeight:700, cursor:"pointer", transition:"all 0.15s",
              boxShadow: mode===m ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}>{lbl}</button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {mode==="signup" && (
            <div>
              <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Your Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex" style={inputStyle} />
            </div>
          )}
          {mode==="signup" && (
            <div>
              <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Partner's Name <span style={{ color:"#3a5a6a", fontWeight:400 }}>(optional)</span></label>
              <input value={partner} onChange={e=>setPartner(e.target.value)} placeholder="e.g. Jordan" style={inputStyle} />
            </div>
          )}
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" type="email" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password" style={inputStyle} />
          </div>

          {error && (
            <div style={{ fontSize:13, color:"#b04a4a", background:"#b04a4a18",
              border:"1px solid #b04a4a44", borderRadius:8, padding:"8px 12px" }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} style={{
            ...solidBtn("#1a6b3a"), width:"100%", padding:"13px", fontSize:16, marginTop:4,
          }}>
            {mode==="login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:18, fontSize:13, color:"#3a5a6a" }}>
          {mode==="login" ? "New here? " : "Already have an account? "}
          <button onClick={() => { setMode(mode==="login"?"signup":"login"); setError(""); }}
            style={{ background:"none", border:"none", color:"#1a237e", fontWeight:700,
              cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
            {mode==="login" ? "Create an account" : "Sign in"}
          </button>
        </div>
      </div>

      <div style={{ marginTop:20, fontSize:12, color:"#7a9aaa", textAlign:"center", maxWidth:300 }}>
        Your data is stored privately on this device. Cloud sync coming soon.
      </div>
    </div>
  );
}

export default function App(){
  const today = new Date();
  const [year,     setYear]     = useState(today.getFullYear());
  const [month,    setMonth]    = useState(today.getMonth());
  const [selected, setSelected] = useState(null);
  const [tab,      setTab]      = useState("calendar");
  const [showExport, setShowExport] = useState(false);

  // Auth state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // Load from localStorage on first render, fall back to SAMPLE if nothing saved
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_data");
      return saved ? JSON.parse(saved) : SAMPLE;
    } catch { return SAMPLE; }
  });

  const [customTopics, setCustomTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_topics");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Save to localStorage whenever data or customTopics change
  useEffect(() => {
    try { localStorage.setItem("conflict_log_data", JSON.stringify(data)); }
    catch {}
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem("conflict_log_topics", JSON.stringify(customTopics)); }
    catch {}
  }, [customTopics]);

  // Reminder notification — ask permission and schedule daily reminder
  useEffect(() => {
    if(!user) return;
    if("Notification" in window && Notification.permission === "default"){
      Notification.requestPermission();
    }
  }, [user]);

  function addCustomTopic(t){
    setCustomTopics(prev => prev.includes(t) ? prev : [...prev, t]);
  }

  function handleLogout(){
    try { localStorage.removeItem("conflict_log_user"); } catch{}
    setUser(null);
  }

  const [exportText, setExportText] = useState(null);

  // Export summary as copyable text
  function handleExport(){
    const allEntries = Object.entries(data).flatMap(([k,entries]) =>
      entries.map(e => ({ ...e, dateKey:k }))
    ).sort((a,b) => a.dateKey.localeCompare(b.dateKey));
    const lines = ["ARGUMENT LOG EXPORT", "===================", ""];
    let lastMonth = "";
    allEntries.forEach(e => {
      const mo = e.dateKey.slice(0,7);
      if(mo !== lastMonth){
        lines.push(`\n--- ${MONTHS[parseInt(mo.split("-")[1])-1]} ${mo.split("-")[0]} ---`);
        lastMonth = mo;
      }
      lines.push(`${e.dateKey}  [${INTENSITIES[e.intensity].label}]  ${e.topic}`);
      if(e.note) lines.push(`  Note: ${e.note}`);
    });
    setExportText(lines.join("\n"));
  }

  if(!user) return <LoginScreen onLogin={setUser} />;


  const daysInMonth = getDaysInMonth(year,month);
  const firstDay    = getFirstDay(year,month);

  function prevMonth(){ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); setSelected(null); }
  function nextMonth(){ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); setSelected(null); }

  function addEntry(dateKey,entry)    { setData(d=>({...d,[dateKey]:[...(d[dateKey]||[]),entry]})); }
  function updateEntry(dateKey,entry) { setData(d=>({...d,[dateKey]:d[dateKey].map(e=>e.id===entry.id?entry:e)})); }
  function deleteEntry(dateKey,id){
    setData(d=>{
      const upd=(d[dateKey]||[]).filter(e=>e.id!==id);
      const n={...d};
      if(upd.length===0) delete n[dateKey]; else n[dateKey]=upd;
      return n;
    });
  }

  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);

  const isToday = d => d===today.getDate() && month===today.getMonth() && year===today.getFullYear();

  function dotColor(key){
    const entries=data[key]||[];
    if(!entries.length) return null;
    return INTENSITIES[Math.max(...entries.map(e=>e.intensity))].color;
  }

  const selectedKey     = selected ? toKey(year,month,selected) : null;
  const selectedEntries = selectedKey ? (data[selectedKey]||[]) : [];
  const selectedLabel   = selected ? `${MONTHS[month]} ${selected}, ${year}` : "";

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"28px 16px 48px",
      fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      {/* Export Modal */}
      {exportText && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)",
          display:"flex", alignItems:"center", justifyContent:"center",
          zIndex:1000, padding:16 }}>
          <div style={{ background:"#ffffff", borderRadius:16, width:"100%", maxWidth:400,
            padding:"22px", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", maxHeight:"80vh",
            display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:16, fontWeight:700, color:"#1a3040" }}>Export Data</div>
              <button onClick={() => setExportText(null)} style={{
                background:"none", border:"none", fontSize:20,
                color:"#3a5a6a", cursor:"pointer" }}>✕</button>
            </div>
            <div style={{ fontSize:13, color:"#3a5a6a" }}>
              Select all the text below and copy it to save your data.
            </div>
            <textarea readOnly value={exportText}
              onClick={e => e.target.select()}
              style={{ flex:1, minHeight:280, background:"#e8f0ec",
                border:"1.5px solid #b8d4c4", borderRadius:8,
                color:"#1a3040", fontSize:12, padding:"10px",
                fontFamily:"monospace", resize:"none", outline:"none" }} />
            <button onClick={() => {
              navigator.clipboard?.writeText(exportText)
                .then(() => alert("Copied to clipboard!"))
                .catch(() => alert("Please manually select and copy the text above."));
            }} style={{ ...solidBtn("#1a6b3a"), padding:"11px" }}>
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}


      <div style={{ textAlign:"center", marginBottom:24, width:"100%", maxWidth:400 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <button onClick={handleLogout} style={{
            background:"none", border:"1px solid #b8d4c4", borderRadius:8,
            color:"#3a5a6a", fontSize:12, padding:"5px 10px", cursor:"pointer",
          }}>Sign Out</button>
          <div style={{ textAlign:"center" }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:2 }}>
              <div style={{ background:"#1a237e18", border:"2px solid #1a237e99",
                borderRadius:"50% 50% 50% 50% / 40% 40% 60% 60%",
                padding:"6px 18px", display:"inline-block", position:"relative" }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#1a237e",
                  letterSpacing:"0.25em", textTransform:"uppercase" }}>Between Us</span>
                <div style={{ position:"absolute", width:10, height:10, borderRadius:"50%",
                  background:"#1a237e18", border:"1.5px solid #1a237e99", bottom:-9, left:14 }}/>
                <div style={{ position:"absolute", width:6, height:6, borderRadius:"50%",
                  background:"#1a237e18", border:"1.5px solid #1a237e99", bottom:-16, left:8 }}/>
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:700, color:"#1a3040", letterSpacing:"-0.02em", marginTop:6 }}>Argument Log</div>
          </div>
          <button onClick={handleExport} style={{
            background:"none", border:"1px solid #b8d4c4", borderRadius:8,
            color:"#3a5a6a", fontSize:12, padding:"5px 10px", cursor:"pointer",
          }}>Export</button>
        </div>
        <div style={{ fontSize:13, color:"#3a5a6a" }}>
          {user.name} & {user.partner}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", marginBottom:18, background:"#ffffff",
        border:"1px solid #b8d4c4", borderRadius:12, overflow:"hidden",
        width:"100%", maxWidth:400, padding:4, gap:4 }}>
        {[["calendar","📅  Calendar"],["stats","📊  Summary"]].map(([t,lbl]) => (
          <button key={t} onClick={() => { setTab(t); if(t==="stats") setSelected(null); }} style={{
            flex:1, padding:"9px 0", border:"none", borderRadius:8,
            background: tab===t ? "#c8e6d4" : "transparent",
            color: tab===t ? "#1a6b3a" : "#2a4a5a",
            fontSize:14, fontWeight:700, letterSpacing:"0.06em",
            cursor:"pointer", transition:"all 0.15s",
          }}>{lbl}</button>
        ))}
      </div>

      {/* STATS TAB */}
      {tab==="stats" && (
        <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:16,
          width:"100%", maxWidth:400, padding:"22px 18px",
          boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}>
          <SummaryStats data={data} year={year} month={month} />
        </div>
      )}

      {/* CALENDAR TAB */}
      {tab==="calendar" && (
        <>
          <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:16,
            width:"100%", maxWidth:400, padding:"22px 18px",
            boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
              <button onClick={prevMonth} style={{ background:"none",border:"none",color:"#2a4a5a",fontSize:26,cursor:"pointer",padding:"0 10px",lineHeight:1 }}>‹</button>
              <div style={{ color:"#1a3040", fontWeight:700, fontSize:20 }}>{MONTHS[month]} {year}</div>
              <button onClick={nextMonth} style={{ background:"none",border:"none",color:"#2a4a5a",fontSize:26,cursor:"pointer",padding:"0 10px",lineHeight:1 }}>›</button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:6 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign:"center",fontSize:11,letterSpacing:"0.12em",
                  color:"#3a5a6a",textTransform:"uppercase",paddingBottom:6 }}>{d}</div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
              {cells.map((day,i) => {
                if(!day) return <div key={`e${i}`} />;
                const key   = toKey(year,month,day);
                const color = dotColor(key);
                const isSel = selected===day;
                const tod   = isToday(day);
                return (
                  <button key={day} onClick={() => setSelected(isSel ? null : day)} style={{
                    background: isSel ? "#1a6b3a" : tod ? "#ddeae3" : "transparent",
                    border: tod&&!isSel ? "1.5px solid #3a5a6a" : "1.5px solid transparent",
                    borderRadius:9, padding:"7px 2px",
                    display:"flex", flexDirection:"column", alignItems:"center",
                    cursor:"pointer", transition:"background 0.13s",
                  }}>
                    <span style={{ fontSize:14, lineHeight:1,
                      color: isSel?"#ffffff":tod?"#1a3040":"#2a4a5a",
                      fontWeight: tod||isSel?700:400 }}>{day}</span>
                    {color && (
                      <span style={{ display:"block", width:5, height:5, borderRadius:"50%",
                        background: isSel?"rgba(255,255,255,0.7)":color, marginTop:3 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selected && (
            <DayPanel
              dateKey={selectedKey}
              dateLabel={selectedLabel}
              entries={selectedEntries}
              onAdd={addEntry}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
              customTopics={customTopics}
              onAddCustomTopic={addCustomTopic}
            />
          )}
        </>
      )}
    </div>
  );
}
