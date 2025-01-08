// After Effects Script UI: Save Current Frame as PNG
{
    function saveCurrentFrameAsPNG(thisObj) {
        // ウィンドウの作成
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Save Frame", undefined, {resizeable: true});

        // ボタンを作成（ウィンドウサイズにリサイズ対応）
        var btnSaveFrame = win.add("button", [0, 0, 150, 50], "Save Frame");
        win.onResizing = win.onResize = function() {
            btnSaveFrame.size = [win.size[0] - 10, win.size[1] - 10];
            win.layout.layout(true);
        };

        // ボタンのクリック動作を定義
        btnSaveFrame.onClick = function() {
            app.beginUndoGroup("Save Frame");
            try {
                var comp = app.project.activeItem;
                if (comp && comp instanceof CompItem) {
                    // デフォルトファイル名の作成
                    var defaultFileName = comp.name.replace(/[\\\/:*?"<>|]/g, "_") + ".png"; // 禁止文字を置換

                    // 保存先とファイル名を指定
                    var file = File.saveDialog("Save Current Frame", defaultFileName);
                    if (file) {
                        // 現在のフレームを保存
                        comp.saveFrameToPng(comp.time, file);
                    }
                } else {
                    alert("Please select an active composition.");
                }
            } catch (e) {
                alert("An error occurred: " + e.toString());
            } finally {
                app.endUndoGroup();
            }
        };

        win.layout.layout(true);
        return win;
    }

    // スクリプトをUIとして起動
    var scriptUI = saveCurrentFrameAsPNG(this);
    if (scriptUI instanceof Window) {
        scriptUI.center();
        scriptUI.show();
    }
}