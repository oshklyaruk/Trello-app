const markdownPatterns = [
    {
      regexp: /^# (.)+$/g,
      subString: "<h4>$1</h4>"
    },
    {
      regexp: /^\*\*(.+)\*\*$/g,
      subString: "<i>$1</i>"
    },
    {
      regexp: /^\*(.+)\*$/g,
      subString: "<b>$1</b>"
    }
  ]

export default markdownPatterns