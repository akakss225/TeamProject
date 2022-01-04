<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My Page</title>
</head>
<body>
	<ul>
		<li>다이아 1000 점 up</li>
		<li>플레티넘 750 점 up</li>
		<li>골드 500 점 up</li>
		<li>실버 250 점 up</li>
		<li>브론즈</li>
	</ul>
	<div>
		<h2>User Info</h2>
		<ul>
			<li>principal : <sec:authentication property="principal.username" /></li>
			<li>회원번호 : <sec:authentication property="principal.member.mno" /></li>
			<li><sec:authentication property="principal.member.nick" /> 님의 포인트는???</li>
			<li><sec:authentication property="principal.member.point" /> Point</li>
			<li><sec:authentication property="principal.member.authList" /></li>
			<li>회원님의 등급 : <c:out value="${grade}" /></li>
		</ul>
	</div>
	<div>
		<h2>RankByPosting</h2>
		<ul>
			<c:forEach items="${RankByPosting}" var="rank" varStatus="status">
				<li><c:out value="${status.index + 1 }"/> <c:out value="${rank.nick}" /> <c:out value="${rank.posting }"/></li>
			</c:forEach> 
		</ul>
	</div>
	<div>
		<h2>RankByTier</h2>
		<ul>
			<c:forEach items="${RankByTier}" var="tier" varStatus="status">
				<li><c:out value="${status.index + 1 }"/>  
					<c:out value="${tier.nick}" />  
					<c:choose>
						<c:when test="${tier.point < 250 }">Bronze</c:when>
						<c:when test="${tier.point < 500 }">Silver</c:when>
						<c:when test="${tier.point < 750 }">Gold</c:when>
						<c:when test="${tier.point < 1000 }">Platinum</c:when>
						<c:otherwise>Diamond</c:otherwise>
					</c:choose>
					<c:out value="${tier.point }"/>
				</li>
			</c:forEach> 
		</ul>
	</div>
	
</body>
</html>