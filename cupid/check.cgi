#!/usr/local/bin/perl

#┌─────────────────────────────────
#│ CupidCounter : check.cgi - 2011/07/22
#│ Copyright (c) KentWeb
#│ http://www.kent-web.com/
#└─────────────────────────────────

# モジュール宣言
use strict;
use CGI::Carp qw(fatalsToBrowser);

require "./init.cgi";
my %cf = &init;

print <<EOM;
Content-type: text/html

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=shift_jis">
<title>Check Mode</title>
</head>
<body>
<b>Check Mode: [ $cf{version} ]</b>
<ul>
EOM

# ログファイルのパス確認
if (-e $cf{logfile}) {
	print "<li>ログファイルのパス : OK\n";

	# ログファイルのパーミッション
	if (-r $cf{logfile} && -w $cf{logfile}) {
		print "<li>ログファイルのパーミッション : OK\n";
	} else {
		print "<li>ログファイルのパーミッション : NG\n";
	}
} else {
	print "<li>ログファイルのパス : NG\n";
}

# 画像ディレクトリ
if (-d $cf{gifdir}) {
	print "<li>画像ディレクトリパス : OK\n";
} else {
	print "<li>画像ディレクトリパス : NG\n";
}

# 画像チェック
foreach my $i (0 .. 9) {
	if (-e "$cf{gifdir}/$i.gif") {
		print "<li>画像 : $i.gif → OK\n";
	} else {
		print "<li>画像 : $i.gif → NG\n";
	}
}

eval { require $cf{gifcat_pl}; };
if ($@) {
	print "<li>gifcat.plテスト : NG\n";
} else {
	print "<li>gifcat.plテスト : OK\n";
}

eval { require Image::Magick; };
if ($@) {
	print "<li>Image::Magickテスト : NG\n";
} else {
	print "<li>Image::Magickテスト : OK\n";
}

# 著作権表示：削除改変禁止
print <<EOM;
</ul>
<p style="font-size:10px;font-family:Verdana,Helvetica,Arial;margin-top:5em;text-align:center;">
- <a href="http://www.kent-web.com/">CupidCounter</a> -
</p>
</body>
</html>
EOM
exit;

