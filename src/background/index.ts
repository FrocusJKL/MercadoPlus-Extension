chrome.runtime.onInstalled.addListener(() => {
  void chrome.storage.local.get('settings').then(result => {
    if (!result.settings) chrome.storage.local.set({ settings: { theme: 'system' } })
  })
})
