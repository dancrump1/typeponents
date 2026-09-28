import { PerfSlayer } from "./perf-slayer";

export function Content() {
	return (
		<>
			<h2>External links to all the sidebars</h2>
			<div className="flex space-x-4">
				<a href="https://react-components-from-scratch.vercel.app/sidebar/initial">
					Initial
				</a>
				<a href="https://react-components-from-scratch.vercel.app/sidebar/linear">
					Linear
				</a>
				<a href="https://react-components-from-scratch.vercel.app/sidebar/notion">
					Notion
				</a>
				<a href="https://react-components-from-scratch.vercel.app/sidebar/gitlab">
					Gitlab
				</a>
			</div>

			<h2>
				<code>PerfSlayer</code>
			</h2>
			<p className="">
				Increase this value to intentionally bottle neck the main thread
			</p>

			<PerfSlayer className="h-96 w-full mb-12" />
			<h2>External links to each sidebar examples</h2>

			<p>
				<strong>Pellentesque habitant morbi tristique</strong> senectus et
				netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
				feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
				libero sit amet quam egestas semper.{" "}
				<em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
				leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
				erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit
				amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
				ipsum rutrum orci, sagittis tempus lacus enim ac dui.{" "}
				<a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut
				felis.
			</p>

			<h2>Header Level 2</h2>

			<ol>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ol>

			<blockquote>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
					molestie gravida. Curabitur massa. Donec eleifend, libero at
					sagittis mollis, tellus est malesuada tellus, at luctus turpis
					elit sit amet quam. Vivamus pretium ornare est.
				</p>
			</blockquote>

			<h3>Header Level 3</h3>

			<ul>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ul>

			<pre>
				<code>
					{`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
				</code>
			</pre>
			<h2>Header Level 2</h2>

			<ol>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ol>

			<blockquote>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
					molestie gravida. Curabitur massa. Donec eleifend, libero at
					sagittis mollis, tellus est malesuada tellus, at luctus turpis
					elit sit amet quam. Vivamus pretium ornare est.
				</p>
			</blockquote>

			<h3>Header Level 3</h3>

			<ul>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ul>

			<pre>
				<code>
					{`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
				</code>
			</pre>
		</>
	);
}
