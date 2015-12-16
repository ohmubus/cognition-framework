const g       = require("gulp-load-plugins")()
    , gulp    = require("gulp")

const paths = {
    src: "src/cognition.js",
    dist: "dist",
    dev: "dev",
    seele: {
        src: "node_modules/seele/src/seele.js",
        dist: "dev/js"
    },
    catbus: {
        src: "node_modules/catbus/dist/catbus.js",
        dist: "dev/js"
    },
    jquery: {
        src: "node_modules/jquery/dist/jquery.js",
        dist: ""
    },
    devFiles: [
        "src/cognition.js",
        "node_modules/jquery/dist/jquery.js",
        "node_modules/catbus/dist/catbus.js",
        "node_modules/seele/src/seele.js",
        "src/**/*.html"
    ]
}

const src  = gulp.src.bind(gulp)
const dest = gulp.dest.bind(gulp)

gulp.task("copy", () => {
    src(paths.src).pipe(dest(paths.dist))
})

gulp.task("copyDev", () => {
    src(paths.devFiles)
        .pipe(g.debug())
        .pipe(dest(paths.dev))
})

gulp.task("serve", () => {
    g.connect.server({
        root: paths.dev,
        port: process.env.PORT || 3000,
        livereload: process.env.RELOAD === "true" ? true : false
    })
})

gulp.task("serveDev", () => {
    g.connect.server({
        root: paths.dev,
        port: process.env.PORT || 3000,
        livereload: process.env.RELOAD === "true" ? true : false
    })
})

gulp.task("reload", () => {
    src("dev/**/*").pipe(g.debug()).pipe(g.connect.reload())
})

gulp.task("watch", () => {
    gulp.watch(paths.src, ["copy"])
})

gulp.task("watchDev", () => {
    gulp.watch(paths.devFiles, ["copyDev"])
    gulp.watch("dev/**/*", ["reload"])
})

const tasks = [
    "copy"
]

gulp.task("ship", tasks)

const devTasks = [
    "copyDev",
    "watchDev",
    "serveDev"
]

gulp.task("default", devTasks)
