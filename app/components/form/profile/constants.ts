export const PROFILE_FORM_PERSONAL_FIELDS = [
    {
        id: "name",
        label: "姓名",
        type: "text",
        required: true,
    },
    {
        id: "email",
        label: "電子郵件",
        type: "text",
        readOnly: true,
    },
    {
        id: "phone",
        label: "手機號碼",
        type: "text",
        required: true,
    },
    {
        id: "birthday",
        label: "生日",
        type: "date",
        required: false,
    },
    {
        id: "lineId",
        label: "Line ID",
        type: "text",
        required: false,
    }
]

export const PROFILE_FORM_SOCIAL_FIELDS = [
    {
        id: "facebook",
        label: "Facebook",
        type: "text",
        required: false,
    },
    {
        id: "instagram",
        label: "Instagram",
        type: "text",
        required: false,
    },
]

export const PROFILE_FORM_NOTIFICATION_FIELDS = [
    {
        id: "notifyBooking",
        label: "預約通知",
        type: "checkbox",
        required: false,
        description: "當有預約變動時，會收到通知，包含預約新增、審核拒絕與通過等。",
    },
    {
        id: "notifyEvent",
        label: "活動通知",
        type: "checkbox",
        required: false,
        description: "當有事件變動時，會收到通知，包含課程取消、課程異動等。",
    }
]

export const PROFILE_FORM_NOTIFICATION_HOW_FIELDS = [
    {
        id: "notifyHow",
        label: "通知方式",
        type: "select",
        required: false,
        options: [
            { id: "LINE", label: "透過 Line 推播" },
            { id: "EMAIL", label: "透過 Email 推播" },
            { id: "NONE", label: "不推播" },
        ],
    }
]
